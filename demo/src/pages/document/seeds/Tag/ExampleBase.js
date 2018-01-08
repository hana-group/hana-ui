import React, {Component} from 'react';
import {Tag} from 'hana-ui';

/**
 * @en
 * Base
 *
 * Using prop `hasClose` to show the close button
 * Using prop `onClose` to control
 *
 * @cn
 * 基础
 *
 * 使用`hasClose`属性显示关闭按钮，`onClose`属性来控制点击事件。
 */
export default class ExampleBase extends Component {

  state = {
    label: ''
  }

  render() {
    return (
      <div>
        <Tag>a tag</Tag>
        <Tag hasClose onClose={(e, label) => this.setState({label})}>tag with close</Tag>
        <Tag hasClose onClose={(e, label) => this.setState({label})}>another tag</Tag>
        <Tag hasClose onClose={(e, label) => this.setState({label})}>another tag2</Tag>
        <p style={{marginTop: 10}}>You want to close <b className="sign">{this.state.label}</b></p>
      </div>
    );
  }
}
