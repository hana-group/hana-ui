import React, {Component} from 'react';
import {IconButton} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * An icon-button with tooltip.
 *
 * @cn
 * 基础
 *
 * 图标按钮，带有tooltip功能。
 */
export default class ExampleBase extends Component {
  state = {
    clicked: false
  }

  render() {
    return (
      <div>
        <ExampleBlock
          en={this.state.clicked ? 'you clicked me' : 'click me plz'}
          cn={this.state.clicked ? '你点击了我>_<' : '点我点我0v0'}
        >
          <IconButton
            tipContent="Hello Shooting Star"
            type="yukibana-o"
            size="large"
            onClick={() => this.setState({clicked: true})}
          />
        </ExampleBlock>

        <ExampleBlock
          en={<p>you can only use iconbutton without tooltip</p>}
          cn={<p>不传`tipContent`时，不显示tooltip</p>}
        >
          <IconButton type="gomi" color="red" size="large" />
        </ExampleBlock>

        <ExampleBlock
          en={'disabled icon'}
          cn={'被禁用的图标按钮'}
        >
          <IconButton
            type="gomi"
            color="red"
            size="large"
            disabled
            onClick={
              () => alert('1') //eslint-disable-line
            }
          />
        </ExampleBlock>
      </div>
    );
  }
}
