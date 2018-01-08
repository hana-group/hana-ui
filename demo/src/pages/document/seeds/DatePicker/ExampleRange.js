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
 * Date range.
 *
 * Property `yearStart` and `yearEnd` are used for setting range for selectable date.
 *
 * @cn
 * 日期范围
 *
 * 属性`yearStart`和`yearEnd`被用于设定可选的日期范围，指定的是年份。
 */
export default () => (
  <div>
    <ExampleBlock
      en={(
        <p>From `2000` to `2100`.</p>
      )}
      cn={(
        <p>从`2000`年到`2100`年。</p>
      )}
    >
      <DatePicker
        yearStart={2000}
        yearEnd={2100}
      />
    </ExampleBlock>
  </div>
);
