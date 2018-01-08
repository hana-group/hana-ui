import React, {Component} from 'react';
import {Image, Card} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';


const exampleSrc = 'https://t4.kn3.net/taringa/5/C/0/6/C/9/DogeDogOficial/59C.jpg';
/**
 * @en
 * Base
 *
 * Images with different size and shape.
 *
 * @cn
 * 基础
 *
 * 不同尺寸、形状的图片。
 */
export default class ExampleBase extends Component {
  render() {
    return (
      <div style={{padding: 10}}>
        <ExampleBlock
          en={<p>tiny size:</p>}
          cn={<p>极小尺寸:</p>}
        >
          <Image src={exampleSrc} size="tiny" />
        </ExampleBlock>

        <ExampleBlock
          en={<p>small size:</p>}
          cn={<p>小尺寸:</p>}
        >
          <Image src={exampleSrc} size="small" />
        </ExampleBlock>

        <ExampleBlock
          en={<p>default size:</p>}
          cn={<p>普通尺寸:</p>}
        >
          <Image src={exampleSrc} />
        </ExampleBlock>

        <ExampleBlock
          en={<p>large size:</p>}
          cn={<p>大尺寸:</p>}
        >
          <Image src={exampleSrc} size="large" />
        </ExampleBlock>

        <ExampleBlock
          en={<p>huge size:</p>}
          cn={<p>极大尺寸:</p>}
        >
          <Image src={exampleSrc} size="huge" />
        </ExampleBlock>

        <ExampleBlock
          en={<p>circular:</p>}
          cn={<p>圆形:</p>}
        >
          <Image src={exampleSrc} circular />
        </ExampleBlock>

        <ExampleBlock
          en={<p>in card:</p>}
          cn={<p>在卡片中使用:</p>}
        >
          <Card style={{width: '300px'}} title="pictures">
            <Image src={exampleSrc} fullWidth />
            <p style={{margin: 10}}>This is a Card with picture</p>
          </Card>
        </ExampleBlock>

      </div>
    );
  }
}
