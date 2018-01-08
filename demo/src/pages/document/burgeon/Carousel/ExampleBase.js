import React, {Component} from 'react';
import {Carousel} from 'hana-ui';

/**
 * @en
 * Base
 *
 * A base `Carousel` example.
 *
 * @cn
 * 基础
 *
 * 一个基本的旋转木马组件。
 */
export default class ExampleBase extends Component {
  state = {
    // index: 0
  }

  render() {
    const width = 400;
    const height = 200;
    const styles = {
      width,
      height,
      display: 'block'
    };

    const element = [
      <div key={1}><img src="https://mdn.mozillademos.org/files/5397/rhino.jpg" alt="" style={styles} /></div>,
      <div key={2}><img style={styles} src="https://t4.kn3.net/taringa/5/C/0/6/C/9/DogeDogOficial/59C.jpg" alt="" /></div>,
      <div key={3}>3</div>
    ];
    return (
      <div style={{background: '#fff', padding: 20}}>
        <Carousel width={width} height={height}>
          {element}
        </Carousel>

        <br />

        <Carousel width={width} height={height} vertical>
          {element}
        </Carousel>

        <br />

        <Carousel width={width} height={height} mode="slide" autoplay>
          {element}
        </Carousel>

        <br />

        <Carousel width={width} height={height} mode="slide" vertical>
          {element}
        </Carousel>
      </div>
    );
  }
}
