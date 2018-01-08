/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/4
 */
import _ from 'lodash';
import {NoKeyError, MissingKeyError, SourceLoadError} from '../exceptions';
import {
  HImage, HAudio, HAnimation, HVideo, createHTransition, HShape, HText, HScreen
} from '../elements';
import {audioIncubator} from '../media';
import systemVariables from '../systemVariables';
import * as globalStore from './store';

const debug = systemVariables.getVar('debug');

class DefBase {
  _reqProps = [];
  _defaultAttrs = {};
  _key = 'base';

  get key() {
    return this._key;
  }

  get default() {
    return _.cloneDeep(this._defaultAttrs);
  }

  has = name => (
    !!globalStore.get(name)
  );

  check = (name, props) => {
    this._checkProps(name, props, this._reqProps);
  };

  define = (name, props) => {
    if (debug) {
      this._checkProps(name, props, this._reqProps);
    }
    return this._define(name, props, globalStore);
  };

  _checkProps = (name, props, reqProps) => {
    reqProps.forEach(prop => {
      if (props[prop] === undefined) {
        throw new MissingKeyError(`${this._key} ${name}'s definition`, prop, props);
      }
    });
  };

  _define = (name, props, store) => (
    new Promise(resolve => {
      const element = store[name] || {};
      for (const key in props) {
        if (props.hasOwnProperty(key) && props[key] !== null) {
          element[key] = props[key];
        }
      }
      store.set({name, element, type: this.key});
      resolve({name, attrs: store.get(name)});
    })
  );
}

export class CharacterDef extends DefBase {
  _reqProps = [
    'whoColor',
    'whatColor',
    'background'
  ];
  _defaultAttrs = {
    whoColor: '#000',
    whatColor: '#000',
    background: ''
  };
  _key = 'character';
}

export class ImageDef extends DefBase {
  _reqProps = [
    'url',
    'child'
  ];
  _key = 'image';

  // attrs = (name, child) => {
  //   let attrs = this._store[name];
  //   if (!attrs) {
  //     throw new NoKeyError(`${this._key} definitions`, name, this._store);
  //   }
  //   if (!child) {
  //     return attrs;
  //   }
  //   attrs = attrs[child];
  //   if (!attrs) {
  //     throw new NoKeyError(`${this._key} definitions`, `child ${child} in ${name}`, this._store);
  //   }
  //   return attrs;
  // };

  _define = (name, props, store) => (
    new Promise((resolve, reject) => {
      const {child, url} = props;
      const image = new Image();
      image.onload = () => {
        const element = {
          name,
          child,
          type: 'image',
          element: new HImage(image)
        };
        store.set(element);
        resolve({name, child, attrs: element});
      };
      image.onerror = () => {
        reject(new SourceLoadError('Image', `${name} ${child || ''}`, url));
      };
      image.src = url;
    })
  );
}

export class TextDef extends DefBase {
  _reqProps = [
    'text',
    'color',
    'size',
    'cps',
    'width',
    'lineHeight'
  ];
  _key = 'text';

  _define = (name, props, store) => (
    new Promise(resolve => {
      const {text, ...attrs} = props;
      const element = {
        name,
        type: 'text',
        element: new HText(text, attrs)
      };
      store.set(element);
      resolve({name, attrs: element});
    })
  );
}

// todo: 前端from语法糖（有animation时，解析拆成两句
export class TransformDef extends DefBase {
  _defaultAttrs = {
    left: 0,
    top: 0,
    width: 1,
    height: 1,
    opacity: 1
  };
  _key = 'transform';

  _checkProps = (name, props) => {
    if (!['function', 'normal'].includes(props.type)) {
      throw new NoKeyError(`${this._key} ${name}'s definition, type`, props.type, props);
    }

    let reqProps;
    if (props.type === 'function') {
      reqProps = ['args', 'funBody'];
    } else {
      reqProps = ['left', 'right', 'top', 'bottom', 'opacity'];
    }

    reqProps.forEach(prop => {
      if (props[prop] === undefined) {
        throw new MissingKeyError(`${this._key} ${name}'s definition`, prop, props);
      }
    });
  };

  _define = (name, props, store) => (
    new Promise((resolve, reject) => {
      let element = {
        args: '',
        funBody: ''
      };

      if (props.type === 'normal') {
        element.args = '';
        element.funBody = Object.keys(props)
          .filter(prop => (prop !== 'type' && props[prop] !== null))
          .map(prop => `${prop}: ${props[prop]}`)
          .join(',');
        element.funBody = `return {${element.funBody}};`;
      } else {
        element.args = props.args;
        element.funBody = props.funBody;
      }

      // todo: 定义的时候就生成参数测试一下是否正确
      try {
        element = new Function(element.args, element.funBody);
        store.set({name, element, type: 'transform'});
        resolve({name, attrs: element});
      } catch (err) {
        reject(new Error(`The function's definition of transform ${name} occurs an error: ${err.message}`));
      }
    })
  );
}

export class AudioDef extends DefBase {
  _reqProps = [
    'url'
  ];
  _key = 'audio';

  load = (url, callback, errorCallback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      callback(xhr.response);
    };
    xhr.onerror = errorCallback;
    xhr.ontimeout = errorCallback;
    xhr.send();
  }

  _define = (name, props, store) => (
    new Promise((resolve, reject) => {
      const {url} = props;
      this.load(
        url,
        res => {
          audioIncubator.decodeAudioData(
            res,
            buffer => {
              // Web Audio Source
              const element = {
                name,
                type: 'audio',
                element: new HAudio(buffer, audioIncubator.context)
              };
              store.set(element);
              resolve({name, attrs: element});
            }
          );
        },
        () => reject(new SourceLoadError('Audio', `${name}`, url))
      );
    })
  )
}

export class VideoDef extends DefBase {
  _reqProps = [
    'url'
  ];
  _key = 'video';

  load = (url, callback, errorCallback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      callback(xhr.response);
    };
    xhr.onerror = errorCallback;
    xhr.ontimeout = errorCallback;
    xhr.send();
  }

  _define = (name, props, store) => (
    new Promise((resolve, reject) => {
      const {url} = props;
      const video = document.createElement('video');
      video.src = url;
      video.oncanplaythrough = () => {
        const element = {
          name,
          type: 'video',
          element: new HVideo(video)
        };
        store.set(element);
        resolve({name, attrs: element});
      };
      video.onerror = () => {
        reject(new SourceLoadError('Video', `${name}`, url));
      };
    })
  )
}

export class AnimationDef extends DefBase {
  _reqProps = [
    'duration',
    'types'
  ];
  _defaultAttrs = undefined;
  _key = 'animation';
  _define = (name, props, store) => (
    new Promise(resolve => {
      const element = {
        name,
        type: 'animation',
        element: new HAnimation(props.duration, props.types)
      };
      store.set(element);
      resolve({name, attrs: element});
    })
  );
}

export class TransitionDef extends DefBase {
  _reqProps = [
    'type',
    'params'
  ];
  _defaultAttrs = undefined;
  _key = 'transition';
  _define = (name, props, store) => (
    new Promise(resolve => {
      const element = {
        name,
        type: 'transition',
        element: createHTransition(props.type, props.params)
      };
      store.set(element);
      resolve({name, attrs: element});
    })
  );
}

export class ShapeDef extends DefBase {
  _reqProps = [
    'params'
  ];
  _defaultAttrs = undefined;
  _key = 'shape';
  _define = (name, props, store) => (
    new Promise(resolve => {
      const element = {
        name,
        type: 'shape',
        element: new HShape(props.params)
      };
      store.set(element);
      resolve({name, attrs: element});
    })
  );
}

export class ScreenDef extends DefBase {
  _reqProps = [
    'children'
  ];
  _defaultAttrs = undefined;
  _key = 'screen';
  _define = (name, props, store) => (
    new Promise(resolve => {
      const width = typeof props.width === 'number' ? props.width : systemVariables.getVar('screenWidth');
      const height = typeof props.height === 'number' ? props.height : systemVariables.getVar('screenHeight');
      const element = {
        name,
        type: 'screen',
        element: new HScreen(props.children, width, height)
      };
      store.set(element);
      resolve({name, attrs: element});
    })
  );
}

export class VarDef extends DefBase {
  _reqProps = [
    'value'
  ];
  _defaultAttrs = undefined;
  _key = 'var';
  _define = (name, props, store) => (
    new Promise(resolve => {
      const element = {
        name,
        type: 'var',
        element: props.value
      };
      store.setVar(name, props.value);
      resolve({name, attrs: element});
    })
  )
}

export class SliderDef extends DefBase {
  _reqProps = [];
  _key = 'slider';
  _defaultAttrs = undefined;
  _define = (name, props, store) => (
    new Promise(resolve => {
      const element = {
        name,
        type: 'slider',
        element: props.value
      };
      store.setVar(name, props.value);
      resolve({name, attrs: element});
    })
  )
}
