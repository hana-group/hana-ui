import React, {Component} from 'react';
import {AudioPlayer} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

const songList = [
  {
    src: 'http://oekm6wrcq.bkt.clouddn.com/時間列車.mp3',
    poster: 'http://oekm6wrcq.bkt.clouddn.com/時間列車.jpg',
    title: '時間列車',
    artist: 'supercell'
  },
  {
    src: 'http://oekm6wrcq.bkt.clouddn.com/white-moon-and-smiling-sun.mp3',
    poster: 'http://oekm6wrcq.bkt.clouddn.com/white-moon-and-smiling-sun.jpg',
    title: '白い月、微笑んだ太陽',
    artist: '中恵光城'
  },
  {
    src: 'http://oekm6wrcq.bkt.clouddn.com/Ordinary World.ogg',
    poster: 'http://oekm6wrcq.bkt.clouddn.com/Ordinary World.jpg',
    title: 'Ordinary World',
    artist: '仲村芽衣子'
  }
];

/**
 * @en
 * Base
 *
 * Base example.
 *
 * @cn
 * 基础
 *
 * 基础例子。
 *
 */
export default class ExampleBase extends Component {
  render() {
    return (
      <div>
        <ExampleBlock>
          <AudioPlayer
            list={songList}
            defaultPoster={'http://activity.hdslb.com/blackboard/rhyme/images/29k5y2l840.gif'}
          >
            1
          </AudioPlayer>
        </ExampleBlock>
      </div>
    );
  }
}
