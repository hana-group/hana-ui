import React, {Component} from 'react';
import {Select, Option} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 * Base select module
 *
 * @cn
 * 基础
 * 通用的选择组件
 */
export default class ExampleBase extends Component {
  state = {
    value: '1',
    label: '',
    index: ''
  }

  render() {
    const {value} = this.state;
    return (
      <div>
        <ExampleBlock
          en={'Base Select controlled by prop value:'}
          cn={'使用value属性控制选中的值:'}
        >
          <Select style={{width: 250}} value={value} onChange={v => this.setState({value: v})}>
            <Option label="Yui" value="1" disabled />
            <Option label="Azusa" value="2" />
            <Option label="Mio" value="3" />
          </Select>
        </ExampleBlock>

        <ExampleBlock
          en={'You may use the auto mode:'}
          cn={'使用属性auto开启自控模式:'}
        >
          <Select
            style={{width: 150}}
            defaultLabel="Please select"
            auto
            size="small"
          >
            <Option label="Moe!" value="1" />
            <Option label="Moe>_<Moe" value="2" />
            <Option label="Moe ~~ Moe ~~ Chu" value="3" />
          </Select>
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>You select option (<b className="sign">{this.state.label}</b>) and
              index (<b className="sign">{this.state.index}</b>)
            </p>
          )}
          cn={(
            <p>你选择了选项(<b className="sign">{this.state.label}</b>)，
              序号为(<b className="sign">{this.state.index}</b>)
            </p>
          )}
        >
          <Select
            style={{width: 150}}
            defaultLabel="Please select"
            auto
            onSelect={(val, index, label) => this.setState({label, index})}
          >
            <Option label="Moe" value="1" />
            <Option label="Moe Moe" value="2" />
            <Option label="Moe Moe Chu" value="3" />
          </Select>
        </ExampleBlock>

        <ExampleBlock
          en={'Use prop disabled to disable the Select:'}
          cn={'添加disabled属性来禁用选择:'}
        >
          <Select
            style={{width: 250}}
            defaultLabel="Please select"
            auto
            disabled
          >
            <Option label="Moe" value="1" />
            <Option label="Moe Moe" value="2" />
            <Option label="Moe Moe Chu" value="3" />
          </Select>
        </ExampleBlock>

        <ExampleBlock
          en={'Build options by map:'}
          cn={'使用map来构建Option:'}
        >
          <Select
            style={{width: 250}}
            defaultLabel="Please select"
            auto
          >
            <Option label="Moe" value="1" />
            {['Moe Moe', 'Moe Moe Chu'].map(i => <Option label={i} key={i} value={i} />)}
          </Select>
        </ExampleBlock>


      </div>
    );
  }
}
