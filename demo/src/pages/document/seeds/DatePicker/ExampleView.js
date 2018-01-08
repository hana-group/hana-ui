/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/20
 */
import React from 'react';
import {DatePicker, Button} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 *@en
 * View types.
 *
 * Set the component will be placed on page.
 *
 * Three view modes are supported,
 * If children is provided, hana will use it as the view component,
 * otherwise, `view` property will decide the default one.
 * `view` could only be `text` now which will place a Text component,
 * and the `click` event will be used as a trigger to open the dialog.
 *
 * @cn
 * 显示类型
 *
 * 设置被日期选择框凭依的组件。
 *
 * 当`children`被提供之时，hana将会用其作为凭依的组件，否则将会根据`view`属性来选择默认的凭依。
 * `view`目前只支持`text`类型，这会提供一个`Text`组件，选择框将会在其被点击时打开。
 */
export default () => (
  <div>
    <ExampleBlock
      en={(
        <p>`text` mode</p>
      )}
      cn={(
        <p>`test`模式</p>
      )}
    >
      <DatePicker />
    </ExampleBlock>

    <ExampleBlock
      en={(
        <p>`custom` mode</p>
      )}
      cn={(
        <p>`custom`模式</p>
      )}
    >
      <DatePicker>
        <Button>
          Show/Close
        </Button>
      </DatePicker>
    </ExampleBlock>
  </div>
);
