import React, {Component} from 'react';
import {Card, Image, Button} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * expand
 *
 * Create an expand card by using prop `expand`.
 * Use prop `expandIcon` to have a custom button.
 * Use prop `open` to control the card's open state.
 *
 * @cn
 * 可伸缩的卡片
 *
 * 使用属性`expand`使得卡片可以展开收起，`expandIcon`用以自定义展开收起的按钮，
 * `open`可以控制卡片的展开状态。
 */
export default class ExampleBase extends Component {
  state = {
    open: false
  }
  render() {
    return (
      <div style={{background: '#fff', paddingLeft: 20}}>
        <ExampleBlock
          cn={<p>使用<b className="sign"> defaultOpen </b>来控制卡片的初始展开</p>}
          en={<p>Using prop<b className="sign"> defaultOpen </b>to let the card open at first-time.</p>}
        >
          <Card title="Example Title" style={{width: 400}} expand defaultOpen>
            <Image src="https://t4.kn3.net/taringa/5/C/0/6/C/9/DogeDogOficial/59C.jpg" />
          </Card>
        </ExampleBlock>

        <ExampleBlock
          cn={<p>点击按钮来控制卡片的展开收起</p>}
          en={<p>Using Button to control open state with custom icon.</p>}
        >
          <Card
            title="Example Title"
            subtitle="(Sub)"
            style={{width: 400, marginBottom: 10}}
            expand
            expandIcon={<Button>replaced</Button>}
            open={this.state.open}
          >
            <Image src="https://t4.kn3.net/taringa/5/C/0/6/C/9/DogeDogOficial/59C.jpg" />
            Doge !
          </Card>
          <Button onClick={() => this.setState({open: !this.state.open})}>toggle</Button>
        </ExampleBlock>
      </div>
    );
  }
}
