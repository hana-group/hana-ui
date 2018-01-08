import React, {Component} from 'react';
import {Progress, Button} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base Example
 *
 * The progress has three different sizes. Using props `color` and `fontColor` to change the color.
 * @cn
 * 基础示例
 *
 * 进度条有三种不同的尺寸，并且可以通过`color`和`fontColor`属性更改颜色。
 */
export default class ExampleBase extends Component {
  state = {
    value: 10
  }

  startLoading = () => {
    this.setState({show: true});
    setTimeout(
      () => this.setState({show: false}),
      3000
    );
  }

  render() {
    const {value} = this.state;
    return (
      <div>
        <ExampleBlock
          en={'base progress:'}
          cn={'基础进度条:'}
        >
          <Progress value={value} />
          <br />
          <Button
            type="primary"
            onClick={() => this.setState({value: value < 100 ? value + 10 : value})}
            style={{marginRight: 10}}
          >+10</Button>
          <Button
            type="primary"
            onClick={() => this.setState({value: value > 0 ? value - 10 : value})}
          >-10</Button>
        </ExampleBlock>
        <br />

        <ExampleBlock
          en={'custom color and small size:'}
          cn={'自定义颜色，小尺寸:'}
        >
          <Progress value={72} color="#1a1" fontColor="#2b2" style={{width: 200}} size="small" />
        </ExampleBlock>
        <br />

        <ExampleBlock
          en={'large size:'}
          cn={'大尺寸:'}
        >
          <Progress value={15} size="large" />
        </ExampleBlock>
      </div>
    );
  }
}
