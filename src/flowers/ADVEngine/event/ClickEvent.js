import {remove} from 'lodash';
import display from '../display';
import systemVariables from '../systemVariables';

export default class ClickEvent {
  constructor({
    trigger
  }) {
    this._eventList = [];
    this._trigger = trigger;
    document.addEventListener('click', this._handle);
  }

  getScreenInfo = name => {
    const transform = display.layers.getAttr(name, 'transform');
    return transform;
  }

  getScreenChildrenInfo = name => {
    const elements = display.layers.getAttr(name, 'element');
    const eventList = [];
    elements.children.forEach(
      item => {
        const actions = item.events ? item.events.map(i => i.action) : [];
        eventList.push({
          transform: item.transform,
          actions
        });
      }
    );
    return eventList;
  }

  isInRect = (x, y, item) => {
    // get currentScreen transform info
    const currentScreen = this.getScreenInfo(item.name);

    // get the game's left & width
    const screen = systemVariables.getVar('screen');

    // just calc the radio
    const leftRadio = (x - screen.left) / screen.width;
    const topRadio = (y - screen.top) / screen.height;

    return (
      leftRadio >= item.transform.left + currentScreen.left &&
      leftRadio <= item.transform.left + currentScreen.left + item.transform.width &&
      topRadio >= item.transform.top + currentScreen.top &&
      topRadio <= item.transform.top + currentScreen.top + item.transform.height
    );
  }

  register = (item) => {
    // get position when register
    //
    const children = this.getScreenChildrenInfo(item.name);
    children.forEach(
      child => {
        this._eventList.push({
          name: item.name,
          ...child
        });
      }
    );
  }

  _handle = e => {
    if (this._eventList.length) {
      // just trigger the top level event
      let topItem = null;
      let topIndex = -1;
      this._eventList.forEach(
        item => {
          if (this.isInRect(e.layerX, e.layerY, item)) {
            // 点中目标 存在一种情况
            const index = display.layers.getIndex(item.name);
            if (index > topIndex) {
              topIndex = index;
              topItem = item;
            }
          }
        }
      );
      if (topItem) this._trigger(topItem);
    }
  }

  remove = name => {
    remove(
      this._eventList,
      item => item.name === name
    );
  }

  clear = () => {
    this._eventList = [];
  }
}
