/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/15
 */
import React, {Component} from 'react';
import {VideoPlayer} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * Base example with tow predefined view type and mode.
 *
 * @cn
 * 基础
 *
 * 基础例子，展示了两种不同的显示类型以及几种模式。
 *
 */
export default class ExampleBase extends Component {
  render() {
    return (
      <div>
        <ExampleBlock>
          <VideoPlayer
            view={'window'}
            list={[
              {
                title: 'op',
                desc: 'eden的OP',
                sources: [
                  {src: '/demo/static/hana-song/video/op.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '/demo/static/hana-song/bg/02.jpg',
                image: '/demo/static/hana-song/bg/01.jpg'
              },
              {
                title: 'world',
                desc: 'bml world',
                sources: [
                  {src: '/demo/static/hana-song/video/world.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '/demo/static/hana-song/bg/02.jpg',
                image: '/demo/static/hana-song/bg/01.jpg'
              },
              {
                title: 'op',
                desc: 'eden的OP',
                sources: [
                  {src: '/demo/static/hana-song/video/op.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '/demo/static/hana-song/bg/02.jpg',
                image: '/demo/static/hana-song/bg/01.jpg'
              },
              {
                title: 'world',
                desc: 'bml world',
                sources: [
                  {src: '/demo/static/hana-song/video/world.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '/demo/static/hana-song/bg/02.jpg',
                image: '/demo/static/hana-song/bg/01.jpg'
              },
              {
                title: 'op',
                desc: 'eden的OP',
                sources: [
                  {src: '/demo/static/hana-song/video/op.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '/demo/static/hana-song/bg/02.jpg',
                image: '/demo/static/hana-song/bg/01.jpg'
              },
              {
                title: 'world',
                desc: 'bml world',
                sources: [
                  {src: '/demo/static/hana-song/video/world.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '/demo/static/hana-song/bg/02.jpg',
                image: '/demo/static/hana-song/bg/01.jpg'
              },
              {
                title: 'op',
                desc: 'eden的OP',
                sources: [
                  {src: '/demo/static/hana-song/video/op.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '/demo/static/hana-song/bg/02.jpg',
                image: '/demo/static/hana-song/bg/01.jpg'
              },
              {
                title: 'world',
                desc: 'bml world',
                sources: [
                  {src: '/demo/static/hana-song/video/world.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '/demo/static/hana-song/bg/02.jpg',
                image: '/demo/static/hana-song/bg/01.jpg'
              }
            ]}
          >
            <p>蛤蛤</p>
          </VideoPlayer>
        </ExampleBlock>
      </div>
    );
  }
}
