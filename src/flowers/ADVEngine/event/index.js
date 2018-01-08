import ast from '../ast';
import display from '../display';
import KeyEvent from './KeyEvent';
import ClickEvent from './ClickEvent';

class HEvent {
  constructor() {
    // this._emitter = mitt();
    this._canvas = display.canvas;
    this._keyEvent = new KeyEvent({
      trigger: this.trigger
    });
    this._clickEvent = new ClickEvent({
      trigger: this.clickTrigger
    });
  }

  trigger = (item) => {
    const {action} = item;
    ast[action[0]].exec(action[1]);
  }

  clickTrigger = (item) => {
    const {actions} = item;
    actions.forEach(
      action => ast[action[0]].exec(action[1])
    );
  }

  register = ({
    type,
    ...others
  }) => {
    if (type === 'keyup') this._keyEvent.register(others);
    if (type === 'click') this._clickEvent.register(others);
    // const key = `${name}.${evt}`;
    // this._eventList[key] = action;
    // this._emitter.on(key, this.emitCallback);
  }

  remove = (name) => {
    // drop all evt;
    // console.log(this._emitter);
    this._keyEvent.remove(name);
    this._clickEvent.remove(name);
  }

  clear = () => {
    this._keyEvent.clear();
    this._clickEvent.clear();
  }

  initClick = () => {
    // this._canvas.addEventListener('click', e => {
    //   console.log({
    //     x: e.layerX,
    //     y: e.layerY
    //   });
    //
    //   console.log(display.layers);
    //   // 判断点击目标?
    //   // screen具有点击事件/ textButton 可能也具有点击事件
    //   // const name = 'bg';
    //   // console.log(display.layers);
    //   // return;
    //   // // 在这里拿到ast?
    //   // this.clickHandle(name);
    // });
  }

  // clickHandle = (name) => {
  //   const action = this._eventList[`${name}.click`];
  //   this._emitter.emit(`${name}.click`, action);
  // }
}

export default new HEvent();
