import React, {Component} from 'react';
import {AudioPlayer} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

const songList = [
  {
    src: '/demo/static/hana-song/music/byebye.mp3',
    poster: 'http://activity.hdslb.com/blackboard/rhyme/images/12j851xxoq.gif',
    title: 'byebye',
    artist: 'test'
  },
  {
    src: '/demo/static/hana-song/music/date.mp3',
    poster: '',
    title: 'date',
    artist: 'test2'
  }
//  {
//    src: '/demo/static/hana-song/music/7!! - ReReハロ~終われそうにない夏~.mp3',
//    poster: '',
//    title: 'ReReハロ~終われそうにない夏~',
//    artist: '7!!'
//  },
//  {
//    src: '/demo/static/hana-song/music/Aimer - 六等星の夜.mp3',
//    poster: '//i2.hdslb.com/bfs/face/d6dc8b90df3becd84579f7190655669fdef6dc13.jpg',
//    title: '六等星の夜',
//    artist: 'Aimer'
//  },
//  {
//    src: '/demo/static/hana-song/music/蔡健雅 - 红色高跟鞋.mp3',
//    poster: '',
//    title: '红色高跟鞋',
//    artist: '蔡健雅'
//  },
//  {
//    src: '/demo/static/hana-song/music/三无MarBlue - 当我在这里（Cover 陈粒）.mp3',
//    poster: '',
//    title: '当我在这里',
//    artist: '三无MarBlue'
//  },
//  {
//    src: '/demo/static/hana-song/music/MYTH & ROID - STYX HELIX.mp3',
//    poster: '',
//    title: 'STYX HELIX',
//    artist: 'MYTH & ROID'
//  },
//  {
//    src: '/demo/static/hana-song/music/wispering - 天ノ弱 piano ver.mp3',
//    poster: '',
//    title: '天ノ弱 piano ver',
//    artist: 'wispering'
//  }
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
