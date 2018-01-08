import React, {Component} from 'react';
import {Image, ImageGroup} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

const exampleSrc = 'https://t4.kn3.net/taringa/5/C/0/6/C/9/DogeDogOficial/59C.jpg';
/**
 * @en
 * Group
 *
 * Using `ImageGroup` to manage a group of pictures.
 *
 * @cn
 * 图片组
 *
 * 使用`ImageGroup`来管理一组图片。
 */
export default class ExampleBase extends Component {
  render() {
    return (
      <ExampleBlock>
        <ImageGroup size="small" circular>
          <Image src={exampleSrc} />
          <Image src={exampleSrc} />
          <Image src={exampleSrc} />
          <Image src={exampleSrc} />
        </ImageGroup>
      </ExampleBlock>
    );
  }
}
