import React, {Component} from 'react';
import {Card, Text} from 'hana-ui';

/**
 * @en
 * Base
 *
 * A base card example.
 *
 * @cn
 * 基础
 *
 * 一个基本的`Card`。
 */
export default class ExampleBase extends Component {
  render() {
    return (
      <div style={{background: '#fff', padding: 20}}>
        <Card title="Example Title" style={{width: 400}}>
          <section style={{display: 'flex', alignItems: 'center', padding: '6px 0'}}>
            <p style={{display: 'inline-block', fontSize: 14, marginRight: 10}}>Input:</p>
            <Text auto withIcon={false} />
          </section>
          <section style={{display: 'flex', alignItems: 'center', padding: '6px 0'}}>
            <p style={{display: 'inline-block', fontSize: 14, marginRight: 10}}>Input:</p>
            <Text auto withIcon={false} />
          </section>
        </Card>
      </div>
    );
  }
}
