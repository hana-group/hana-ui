/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/16
 */
import React, {Component} from 'react';
import {DatePicker, Button} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * You can set the date with `date` property,
 * if she is not provided, don't worry, this component will be controlled by itself,
 * otherwise, you must provide the `date` property and use callbacks to manage her by yourself.
 *
 * The `date` could be `Date` object or an [legal `dateString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse),
 * if she is an invalid value, hana will reset her to `null`.
 *
 * After selecting a date successful, callback `onChange` will be called,
 * she has two parameters, the first is `date`, the second is a string formatted from `date`.
 *
 * Property `show` and `autoOk` is used for controlling this component more flexible.
 * Use `show`, you could open or close the dialog by yourself.
 * if `autoOk` is true, dialog will be closed automatically after date selected.
 *
 * Except for the default formatting method, hana also provides a property `format`,
 * she is a function used for formatting the date to string.
 *
 * Property `withClear` is used for clearing date.
 *
 * @cn
 * 基础
 *
 * 想要设置日期，请使用`date`属性，但如果你没有提供此属性呢，不要担心，该组件将会工作在自动模式，
 * 但一旦提供了该属性，就必须确保自己对她的控制。
 *
 * 日期接受两种类型的值，一种是js的`Date`对象，一个则是[符合标准的`dateString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)，
 * 如果传进的是无效值，hana呢，会将其重置为`null`。
 *
 * 当日期选择结束后，回调函数`onChange`将会被调用，她有两个参数，
 * 第一个参数传递`date`的变化，第二个参数则传递日期格式化后的字符串。
 *
 * 属性`show`和`auto`使得组件的使用更加灵活。
 * `show`属性提供了一个接口，可以直接让你自行控制日期选择框的打开或关闭。
 * `autoOk`则提供了一个选项，如果将其设为`true`，当日期被成功选择后，便会自动关闭选择框。
 *
 * 而除了默认的格式化之外，hana提供了一个`format`函数，她接受一个`date`，返回一个格式化后的字符串。
 *
 * `withClear`属性用于清空已选择的日期。
 *
 */
export default class ExampleBase extends Component {
  state = {
    autoDate: null,
    autoText: '',
    controlledDate: new Date(),
    show: false,
    dateString: ''
  };

  render() {
    const {
      autoDate,
      autoText,
      controlledDate,
      show,
      dateString
    } = this.state;

    return (
      <div>
        <ExampleBlock
          en={(
            <p>Auto mode, date is `{autoDate === null ? 'null' : autoDate.toString()}`, text is `{autoText}`</p>
          )}
          cn={(
            <p>自动模式，date为`{autoDate === null ? 'null' : autoDate.toString()}`，text为`{autoText}`</p>
          )}
        >
          <DatePicker
            onChange={(date, text) =>
              this.setState({
                autoDate: date,
                autoText: text
              })
            }
          />
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Controlled mode, date will be increased automatically after selection.</p>
          )}
          cn={(
            <p>控制模式，date将会在选择后自增1天。</p>
          )}
        >
          <DatePicker
            date={controlledDate}
            onChange={date => {
              controlledDate.setDate(date.getDate() + 1);
              this.setState({controlledDate});
            }}
          />
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Using string as date value</p>
          )}
          cn={(
            <p>使用字符串作为`date`的值</p>
          )}
        >
          <DatePicker
            date={dateString}
            onChange={(date, text) => {
              this.setState({dateString: text});
            }}
          />
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Auto ok mode</p>
          )}
          cn={(
            <p>Auto ok 模式</p>
          )}
        >
          <DatePicker
            autoOk
          />
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Using `show`</p>
          )}
          cn={(
            <p>使用`show`属性</p>
          )}
        >
          <div className="flex">
            <Button
              style={{
                marginRight: 12
              }}
              onClick={() => this.setState({show: !show})}
            >
              {this.state.show ? 'Close' : 'Show'}
            </Button>
            <div>
              <DatePicker
                show={show}
              />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Format: %d / %m - %y</p>
          )}
          cn={(
            <p>格式化: %d / %m - %y</p>
          )}
        >
          <DatePicker
            format={date => {
              const day = date.getDate();
              const month = date.getMonth();
              const year = date.getFullYear();
              return `${day < 10 ? '0' : ''}${day} \/ ${month < 9 ? '0' : ''}${month + 1} - ${year}`; // eslint-disable-line
            }}
          />
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Clear</p>
          )}
          cn={(
            <p>清空</p>
          )}
        >
          <DatePicker
            autoOk
            withClear
          />
        </ExampleBlock>
      </div>
    );
  }
}
