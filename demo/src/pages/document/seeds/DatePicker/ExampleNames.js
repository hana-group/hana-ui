/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/20
 */
import React from 'react';
import {DatePicker} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Names
 *
 * This world is colorful, so sometimes you may want to use your favorite names to define something.
 * hana allows you to do this, you could use the `weekdayNames`, `weekdayShortNames`, `monthNames` and `actionNames` properties.
 *
 * @cn
 * 命名
 *
 * 这是一个多彩的世界，所以在某些时候，你一定会想按照自己的喜好来对事物命名。
 * 这里，hana提供了一种方法来使得你可以对`天`、`月份`等命名，你只需要将对应的参数传入即可：
 * `weekdayNames`、`weekdayShortNames`、`monthNames`和`actionNames`
 *
 */
export default () => (
  <div>
    <ExampleBlock>
      <DatePicker
        weekdayNames={[
          '落地',
          '破土',
          '新芽',
          '吐蕾',
          '盛开',
          '结果',
          '重生'
        ]}
        weekdayShortNames={[
          '种',
          '萌',
          '芽',
          '蕾',
          '花',
          '果',
          '落'
        ]}
        monthNames={[
          '正月',
          '杏月',
          '桃月',
          '槐月',
          '蒲月',
          '荷月',
          '巧月',
          '桂月',
          '玄月',
          '阳月',
          '辜月',
          '腊月'
        ]}
        actionNames={{
          ok: '种下种子',
          cancel: '我再想想'
        }}
      />
    </ExampleBlock>
  </div>
);
