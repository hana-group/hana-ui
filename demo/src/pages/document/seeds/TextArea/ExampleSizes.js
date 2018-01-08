/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/8
 */
import React from 'react';
import {TextArea} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Size
 *
 * For different scenes, hana provides three preset sizes defined by property `size`:
 * `small`, `middle` and `large`.
 *
 * TextArea is different from TextArea, hana allows you to use the property `height` to set her height.
 * If you don't need a fixed height, property `autoSize` is also provided to make this component's height be automatic computation,
 * in this mode, property `height` is invalid.
 *
 * @cn
 * 尺寸
 *
 * 针对不同场景，hana提供了一个属性`size`来定义尺寸的大小，现在有`small`、`middle`和`large`三种。
 *
 * 作为一个多行文本，比起单行，高度也是一个重要的属性，hana允许你通过`height`来进行设置。
 * 如果不想用指定的高度，你可以用`autoSize`属性指定一个最大行数和最小行数，
 * 在这种状况下，组件的高度将根据输入的内容自行计算，并且此时`height`会无效。
 *
 */
export default () => (
  <div
    style={{
      backgroundColor: '#fff',
      padding: 8
    }}
  >
    <ExampleBlock>
      <TextArea
        auto
        size={'small'}
        defaultValue={'Small'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        size={'middle'}
        defaultValue={'Middle'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        size={'large'}
        defaultValue={'Large'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        defaultValue={'height={32}'}
        height={32}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        defaultValue={'autoSize={{minLines: 3, maxLines: 8}}'}
        autoSize={{minLines: 3, maxLines: 8}}
      />
    </ExampleBlock>
  </div>
);
