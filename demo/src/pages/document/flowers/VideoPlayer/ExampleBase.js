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
                  {src: '//oekm6wrcq.bkt.clouddn.com/hana-ui/op.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg',
                image: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg'
              },
              {
                title: 'world',
                desc: 'bml world',
                sources: [
                  {src: '//oekm6wrcq.bkt.clouddn.com/hana-ui/world.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg',
                image: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg'
              },
              {
                title: 'op',
                desc: 'eden的OP',
                sources: [
                  {src: '//oekm6wrcq.bkt.clouddn.com/hana-ui/op.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg',
                image: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg'
              },
              {
                title: 'world',
                desc: 'bml world',
                sources: [
                  {src: '//oekm6wrcq.bkt.clouddn.com/hana-ui/world.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg',
                image: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg'
              },
              {
                title: 'op',
                desc: 'eden的OP',
                sources: [
                  {src: '//oekm6wrcq.bkt.clouddn.com/hana-ui/op.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg',
                image: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg'
              },
              {
                title: 'world',
                desc: 'bml world',
                sources: [
                  {src: '//oekm6wrcq.bkt.clouddn.com/hana-ui/world.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg',
                image: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg'
              },
              {
                title: 'op',
                desc: 'eden的OP',
                sources: [
                  {src: '//oekm6wrcq.bkt.clouddn.com/hana-ui/op.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg',
                image: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg'
              },
              {
                title: 'world',
                desc: 'bml world',
                sources: [
                  {src: '//oekm6wrcq.bkt.clouddn.com/hana-ui/world.mp4'}
                ],
                text: '蛤蛤蛤',
                poster: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg',
                image: '//oekm6wrcq.bkt.clouddn.com/hana-ui/hana.jpg'
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
