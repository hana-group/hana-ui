import React, {Component} from 'react';
import {Icon} from 'hana-ui';
import randomColor from 'randomcolor';
import ExampleBlock from 'demo/ExampleBlock';
import getIcons from './getIcons';

const result = getIcons();

const itemStyle = {
  display: 'inline-block',
  textAlign: 'center',
  width: 200,
  fontSize: 14,
  marginBottom: 20
};
/**
 * @en
 * Base
 *
 * icons
 *
 * @cn
 * 基础
 *
 * 图标
 */
export default class ExampleBase extends Component {
  render() {
    const items = result.map(item => {
      if (!item) {
        return null;
      }
      const color = randomColor({
        luminosity: 'dark',
        format: 'rgb'
      });
      return (
        <div style={itemStyle} key={item.name}>
          <Icon type={item.name} style={{fontSize: 40}} color={color} />
          <p style={{color, margin: '10px 0'}}>{item.name}<span style={{color: '#666'}}>({item.unicode})</span></p>
        </div>
      );
    });
    return (
      <div>
        <ExampleBlock
          en={<p>{'default:'}</p>}
          cn={<p>{'默认：'}</p>}
        >
          <Icon type="snowflake-o" />
        </ExampleBlock>

        <ExampleBlock
          en={<p>{'custom size and color:'}</p>}
          cn={<p>{'自定义尺寸和颜色：'}</p>}
        >
          <Icon type="snowflake-o" color="#f60" style={{fontSize: 40}} />
        </ExampleBlock>

        <ExampleBlock
          en={<p>{'icon list:'}</p>}
          cn={<p>{'图标列表：'}</p>}
        >
          {items}
        </ExampleBlock>
      </div>
    );
  }
}
