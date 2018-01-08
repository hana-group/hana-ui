/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/6
 */
import React, {Component} from 'react';
import {Upload, Checkbox} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * Base example with tow predefined view type and mode.
 *
 * @cn
 * 基础
 *
 * 基础例子，展示了两种不同的显示类型以及几种模式。
 *
 */
export default class ExampleBase extends Component {
  state = {
    baseAuto: false,
    baseMultiple: true,
    boxAuto: false,
    boxMultiple: true
  };

  render() {
    const {
      baseAuto,
      baseMultiple,
      boxAuto,
      boxMultiple
    } = this.state;

    return (
      <div>
        <ExampleBlock
          en={
            <p>View: base</p>
          }
          cn={
            <p>显示类型: base</p>
          }
        >
          <Checkbox
            style={{
              marginRight: 24
            }}
            label={'auto'}
            checked={baseAuto}
            onChange={() => this.setState({baseAuto: !baseAuto})}
          />
          <Checkbox
            label={'multiple'}
            checked={baseMultiple}
            onChange={() => this.setState({baseMultiple: !baseMultiple})}
          />
          <div
            style={{
              width: 320
            }}
          >
            <Upload
              auto={baseAuto}
              multiple={baseMultiple}
              url={'/upload'}
              withCredentials
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          en={
            <p>View: box</p>
          }
          cn={
            <p>显示类型: box</p>
          }
        >
          <Checkbox
            style={{
              marginRight: 24
            }}
            label={'auto'}
            checked={boxAuto}
            onChange={() => this.setState({boxAuto: !boxAuto})}
          />
          <Checkbox
            label={'multiple'}
            checked={boxMultiple}
            onChange={() => this.setState({boxMultiple: !boxMultiple})}
          />
          <div
            style={{
              width: 680,
              height: 240
            }}
          >
            <Upload
              view={'box'}
              auto={boxAuto}
              multiple={boxMultiple}
              url={'/upload'}
              withCredentials
            />
          </div>
        </ExampleBlock>
      </div>
    );
  }
}
