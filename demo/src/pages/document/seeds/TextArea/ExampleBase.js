/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/7
 */
import React, {Component} from 'react';
import {TextArea} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * This component could work in two mode which decided by `auto` property.
 *
 * In the `auto` mode, the component will be controlled by itself, you can give it a `defaultValue` to initialize it.
 * In the other mode, hana wishes you to provides property `value` and use following callbacks to control it:
 * `onChange`、`onBlur`、`onFocus`......
 *
 * @cn
 * 基础
 *
 * 此组件可以工作在两种模式，模式的切换由`auto`属性决定。
 *
 * 若`auto`为真，则会切换为自动模式，此模式下，组件将会完全由内部的状态自行控制，并且可以由`defaultValue`属性设置初始值。
 * 否则则为受控模式，此模式下，hana希望你使用`value`属性来提供一个值，并使用以下回调函数来对其进行控制：
 * `onChange`、`onBlur`、`onFocus`......
 */
export default class ExampleBase extends Component {
  state = {
    autoValue: 'youk.',
    controlledValue: 'Eternal feather'
  };

  render() {
    const {
      autoValue,
      controlledValue
    } = this.state;

    return (
      <div>
        <ExampleBlock
          en={(
            <p>Auto mode, {autoValue}</p>
          )}
          cn={(
            <p>自动模式，{autoValue}</p>
          )}
        >
          <TextArea
            auto
            defaultValue={autoValue}
            onChange={(e, v) => this.setState({
              autoValue: `${v === 'youko' ? 'Ever forever' : 'Emotional flutter'}: ${e.target.value}`
            })}
            onFocus={e => this.setState({autoValue: `Ebullient future: ${e.target.value}`})}
            onBlur={e => this.setState({autoValue: `Euphoric field: ${e.target.value}`})}
          />
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Controlled mode</p>
          )}
          cn={(
            <p>受控模式</p>
          )}
        >
          <TextArea
            value={controlledValue}
            onChange={e => this.setState({controlledValue: e.target.value})}
          />
        </ExampleBlock>
      </div>
    );
  }
}
