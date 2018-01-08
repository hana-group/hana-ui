/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/4
 */
import {MissingKeyError, NoKeyError} from '../exceptions';
import definitions, {resourceLoader, store} from '../definitions';
import {HText, createHTransition} from '../elements';
import display from '../display';
import systemVariables from '../systemVariables';
import hEvent from '../event';
import {soundTrack} from '../media';
import {normalizeTransform, checkType} from '../utils';

const debug = systemVariables.getVar('debug');

class ASTBase {
  _reqProps = [];

  get key() {
    return this._key;
  }

  exec = props => {
    if (debug) {
      this._checkProps(props, this._reqProps);
    }
    this._exec(props);
  };

  _checkProps = (props, reqProps) => {
    reqProps.forEach(prop => {
      if (props[prop] === undefined) {
        throw new MissingKeyError(`${this._key}'s ast`, prop, props);
      }
    });
  };

  _exec = props => {}; // eslint-disable-line
}

export class DefineAST extends ASTBase {
  _reqProps = [
    'name',
    'type',
    'props'
  ];

  _key = 'define';

  _check = () => {
    const state = resourceLoader.state;
    if (state.loaded && !state.error) {
      return;
    } else if (state.loaded && state.error) {
      // todo: open a menu to reload
      console.log('reload source');
      this._load();
    } else {
      setTimeout(this._check, 500);
    }
  };

  _load = () => {
    // todo: loading window
    resourceLoader.load();
    this._check();
  };

  _exec = props => {
    if (props.type === 'load') {
      this._load();
    } else if (props.type === 'add' && definitions[props.name]) {
      resourceLoader.add(props.name, props.props.name, props.props.props);
    } else {
      throw new NoKeyError(
        'Definitions', props.name, definitions
      );
    }
  }
}

export class ShowAST extends ASTBase {
  _key = 'show';

  _reqProps = [
    'name',
    'child',
    'animation',
    'transform',
    'transformArgs',
    'transition',
    'behind',
    'alias'
  ];

  _exec = props => {
    const transform = props.transform ? store.get(props.transform).element.apply(props.transformArgs) : {};
    const animation = props.animation ? store.get(props.animation).element : undefined;
    const transition = props.transition ? store.get(props.transition).element : undefined;
    if (debug) {
      checkType([
        {name: props.transform, type: 'transform'},
        {name: props.animation, type: 'animation'},
        {name: props.transition, type: 'transition'}
      ]);
    }

    let element;
    let elementType = null;
    try {
      element = display.layers.getAttr(props.name, 'element');
    } catch (err) {
      const target = store.get(props.name, props.child);
      element = target.element;
      elementType = target.type;
    }

    if (!element.drawable) {
      throw new Error(`${props.name} is not a drawable element !`);
    }

    normalizeTransform(transform, element);

    display.show(
      props.alias || props.name,
      element,
      transform,
      animation,
      transition,
      props.behind
    );

    // bind events
    if (props.events && props.events.length) {
      // register event
      // TODO check the params
      hEvent.remove(props.name);
      props.events.forEach(
        item => hEvent.register(Object.assign({}, item, {name: props.name}))
      );
    } else if (elementType === 'screen' && !props.events) {
      // TODO screen should init click events here
      hEvent.remove(props.name);
      hEvent.register({name: props.name, type: 'click'});
    }
  }
}

export class TextAST extends ASTBase {
  _key = 'text';

  _checkProps = props => {
    const scaleFactor = systemVariables.getVar('scaleFactor');
    const minSize = 12 / scaleFactor;
    props.name = props.text;

    [
      'text', 'color', 'size', 'cps', 'width', 'lineHeight',
      'animation', 'transform', 'transformArgs', 'transition', 'behind', 'alias'
    ].forEach(prop => {
      if (props[prop] === undefined) {
        throw new MissingKeyError(`${this._key}'s ast`, prop, props);
      }
    });

    if (typeof props.text !== 'string') {
      throw new Error('Text of text must be string !');
    }
    if (props.size < minSize) {
      throw new Error(`Size of text must be lager than ${minSize} in this resolution !`);
    }
    if (props.lineHeight !== null && props.lineHeight < props.size) {
      throw new Error(`LineHeight of text must be lager than size ${props.size} !`);
    }
  };

  _exec = props => {
    const transform = props.transform ? store.get(props.transform).element.apply(props.transformArgs) : {};
    const animation = props.animation ? store.get(props.animation).element : undefined;
    const transition = props.transition ? store.get(props.transition).element : undefined;
    transform.color = props.color;
    transform.size = props.size;
    const element = new HText(props.text, {
      size: props.size, cps: props.cps, width: props.width, lineHeight: props.lineHeight || props.size
    });
    props.name = props.text;

    normalizeTransform(transform, element);

    display.show(
      props.alias || props.name,
      element,
      transform,
      animation,
      transition,
      props.behind
    );
  }
}

export class HideAST extends ASTBase {
  _key = 'hide';

  _reqProps = [
    'name',
    'animation',
    'transform',
    'transformArgs',
    'transition'
  ];

  _exec = props => {
    const transform = props.transform ? store.get(props.transform).element.apply(props.transformArgs) : {};
    const animation = props.animation ? store.get(props.animation).element : undefined;
    const transition = props.transition ? store.get(props.transition).element : undefined;
    if (debug) {
      checkType([
        {name: props.transform, type: 'transform'},
        {name: props.animation, type: 'animation'},
        {name: props.transition, type: 'transition'}
      ]);
    }

    display.hide(props.name, transform, animation, transition);
    // clear event when hide
    hEvent.remove(props.name);
  }
}

export class PlayAST extends ASTBase {
  _key = 'play';

  _reqProps = [
    'name',
    'type'
  ];

  _exec = props => {
    const {name, type, audioType, ...others} = props;
    if (type === 'video') {
      if (store.has(name)) {
        store.get(name).element.play();
      }
    } else if (type === 'audio') {
      if (store.has(name)) {
        if (audioType === 'music') {
          // todo: need change
          // stop other music
          soundTrack.play(
            store.get(name).element,
            'music',
            Object.assign({audioType}, others)
          );
        } else {
          store.get(name).element.start(
            Object.assign({audioType}, others)
          );
        }
      }
    }
  }
}

export class StopAST extends ASTBase {
  _key = 'stop';

  _reqProps = [
    'name'
  ];

  _exec = props => {
    const {name, ...others} = props;
    if (store.has(name)) {
      store.get(name).element.stop(others);
    }
  }
}

const defaultTransition = createHTransition('dissolve', {duration: 1, curve: 'linear'});
export class SceneAST extends ASTBase {
  _key = 'scene';

  _reqProps = [
    'name',
    'child',
    'transform',
    'transformArgs',
    'transition'
  ];

  _exec = props => {
    hEvent.clear();

    const transform = props.transform ? store.get(props.transform).element.apply(props.transformArgs) : {};
    const transition = props.transition ? store.get(props.transition).element : defaultTransition;
    const element = store.get(props.name, props.child).element;
    if (debug) {
      checkType([
        {name: props.transform, type: 'transform'},
        {name: props.transition, type: 'transition'}
      ]);
    }

    if (!element.drawable) {
      throw new Error(`${props.name} is not a drawable element !`);
    }

    normalizeTransform(transform, element);

    display.show(
      props.name,
      element,
      transform,
      undefined,
      transition,
      undefined,
      true
    );
  }
}

export class ExecAST extends ASTBase {
  _key = 'exec';

  _reqProps = [
    'code'
  ];

  _exec = props => {
    const code = `
      var vars = store._vars;
      ${props.code}
    `;
    const func = new Function('store', code); // eslint-disable-line
    func(store);
  }
}
