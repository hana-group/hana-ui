import React, {Component} from 'react';
import {Animation, Button} from 'hana-ui';

/**
 * @en
 * Base
 *
 * `THE CUBE` can changed its position.
 *
 * @cn
 * 基础
 *
 * 一个可以滑动的小方块。
 */
export default class ExampleBase extends Component {
  state = {
    begin: true
  }

  render() {
    const cubeStyle = {
      width: 40,
      height: 40,
      background: '#6cf',
      borderRadius: 5
    };

    const wrapperStyle = {
      height: 40,
      width: 400,
      padding: 5,
      background: '#ddd',
      borderRadius: 5
    };
    return (
      <div>
        <div style={wrapperStyle}>
          <Animation
            animation={{left: this.state.begin ? 0 : 360}}
            duration={400}
          >
            {style => <div
              style={Object.assign({}, cubeStyle, {
                WebkitTransform: `translate3d(${style.left}px, 0, 0)`,
                transform: `translate3d(${style.left}px, 0, 0)`
              })}
            />}
          </Animation>
        </div>
        <br />
        <Button onClick={() => this.setState({begin: !this.state.begin})}>Move</Button>
      </div>
    );
  }
}
