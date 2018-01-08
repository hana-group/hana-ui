/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/4
 */
import React from 'react';
import {Tooltip, Button} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Positions
 *
 * hana provides property `position` to decide where the Tooltip will be shown.
 *
 * @cn
 * 位置
 *
 * hana提供了`position`属性，用于快捷地确定其显示时的位置。
 */
export default () => (
  <div>
    <ExampleBlock>
      <div>
        <div
          style={{
            marginLeft: 140
          }}
        >
          <Tooltip position="top" content={<p>Top</p>}>
            <Button>Top</Button>
          </Tooltip>
        </div>

        <div
          style={{
            marginTop: 24,
            marginBottom: 24
          }}
        >
          <div
            style={{
              display: 'inline-block',
              marginLeft: 50
            }}
          >
            <Tooltip position="left" content={<p>Left</p>}>
              <Button>Left</Button>
            </Tooltip>
          </div>

          <div
            style={{
              display: 'inline-block',
              marginLeft: 110
            }}
          >
            <Tooltip position="right" content={<p>Right</p>}>
              <Button>Right</Button>
            </Tooltip>
          </div>
        </div>

        <div
          style={{
            marginLeft: 130
          }}
        >
          <Tooltip position="bottom" content={<p>Bottom</p>}>
            <Button>Bottom</Button>
          </Tooltip>
        </div>
      </div>
    </ExampleBlock>
  </div>
);
