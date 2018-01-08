/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/4
 */
import React, {Component} from 'react';
import {Tooltip, Switch, Button} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * This component mainly works with state `show` and property `children`,
 * state `show` is used for controlling whether the tooltip will open or close,
 * and property `children` is the component using tooltip.
 *
 * A property `show` is provided for controlling the tooltip will be shown or not,
 * if the `show` is undefined, this component will be controlled by an inner state.
 *
 * If you want to disable this component, please using `disabled`.
 *
 * @cn
 * 基础
 *
 * 此组件的运作主要依赖于`show`状态和`children`属性，前者用于控制弹出框的显示，后者则是弹出框凭依的子级组件。
 *
 * 当`show`属性被定义时，弹出框将会强制打开或关闭，否则将会自行维护内部的`show`状态。
 *
 * 如果你想禁用此组件，可以使用`disabled`样式哦。
 */
export default class ExampleBase extends Component {
  state = {
    autoValue: 'false',
    show: false
  };

  render() {
    const {
      autoValue,
      show
    } = this.state;

    return (
      <div>
        <ExampleBlock
          en={(
            <p>Auto mode, property `show` is `{autoValue}`</p>
          )}
          cn={(
            <p>自动模式，属性`show`为`{autoValue}`</p>
          )}
        >
          <Tooltip
            position={'right'}
            content={<p>You has hovered me www</p>}
            onChange={state => this.setState({autoValue: `${state}`})}
          >
            <Button>Hover me!</Button>
          </Tooltip>
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Controlled mode</p>
          )}
          cn={(
            <p>受控模式</p>
          )}
        >
          <Tooltip
            show={show}
            content={<p>You has controlled the switch !</p>}
            onChange={state => this.setState({controlledValue: state})}
          >
            <Button>Control switch !</Button>
          </Tooltip>
          <Switch
            checked={show}
            onChange={checked => this.setState({show: checked})}
          />
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Disabled</p>
          )}
          cn={(
            <p>禁用模式</p>
          )}
        >
          <Tooltip
            disabled
          >
            <Button>Heng, you can't control me!</Button>
          </Tooltip>
        </ExampleBlock>
      </div>
    );
  }
}
