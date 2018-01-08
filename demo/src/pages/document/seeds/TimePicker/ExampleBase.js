/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/23
 */
import React, {Component} from 'react';
import {TimePicker, Button} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * You can set the time with `time` property,
 * if she is not provided, don't worry, this component will be controlled by itself,
 * otherwise, you must provide the `time` property and use callbacks to manage her by yourself.
 *
 * The `time` could be `Date` object or an [legal `dateString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse),
 * if she is an invalid value, hana will reset her to `null`.
 *
 * After selecting a time successful, callback `onChange` will be called,
 * she has two parameters, the first is `time`, the second is a string formatted from `time`.
 *
 * Property `show` is used for controlling this component more flexible.
 * Use `show`, you could open or close the dialog by yourself.
 *
 * Except for the default formatting method, hana also provides a property `format`,
 * she is a function used for formatting the time to string.
 *
 * Property `withClear` is used for clearing time.
 *
 * @cn
 * 基础
 *
 * 想要设置时间，请使用`time`属性，但如果你没有提供此属性呢，不要担心，该组件将会工作在自动模式，
 * 但一旦提供了该属性，就必须确保自己对她的控制。
 *
 * 时间接受两种类型的值，一种是js的`Date`对象，一个则是[符合标准的`dateString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)，
 * 如果传进的是无效值，hana呢，会将其重置为`null`。
 *
 * 当时间选择结束后，回调函数`onChange`将会被调用，她有两个参数，
 * 第一个参数传递`time`的变化，第二个参数则传递日期格式化后的字符串。
 *
 * 属性`show`使得组件的使用更加灵活。
 * `show`属性提供了一个接口，可以直接让你自行控制时间选择框的打开或关闭。
 *
 * 而除了默认的格式化之外，hana提供了一个`format`函数，她接受一个`time`，返回一个格式化后的字符串。
 *
 * `withClear`属性用于清空已选择的时间。
 */
export default class ExampleBase extends Component {
  state = {
    autoTime: null,
    autoText: '',
    controlledTime: new Date(),
    show: false,
    timeString: ''
  };

  render() {
    const {
      autoTime,
      autoText,
      controlledTime,
      show,
      timeString
    } = this.state;

    return (
      <div>
        <ExampleBlock
          en={(
            <p>Auto mode, time is `{autoTime === null ? 'null' : autoTime.toString()}`, text is `{autoText}`</p>
          )}
          cn={(
            <p>自动模式，date为`{autoTime === null ? 'null' : autoTime.toString()}`，text为`{autoText}`</p>
          )}
        >
          <TimePicker
            onChange={(time, text) =>
              this.setState({
                autoTime: time,
                autoText: text
              })
            }
          />
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Controlled mode, time will be increased automatically after selection.</p>
          )}
          cn={(
            <p>控制模式，date将会在选择后自增1天。</p>
          )}
        >
          <TimePicker
            time={controlledTime}
            onChange={time => {
              controlledTime.setDate(controlledTime.getDate() + 1);
              this.setState({controlledTime: time});
            }}
          />
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Using string as time value</p>
          )}
          cn={(
            <p>使用字符串作为`time`的值</p>
          )}
        >
          <TimePicker
            time={timeString}
            onChange={(time, text) => {
              this.setState({timeString: text});
            }}
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
              <TimePicker
                show={show}
              />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Format: %S / %M - %H</p>
          )}
          cn={(
            <p>格式化: %S / %M - %H</p>
          )}
        >
          <TimePicker
            format={time => {
              const hour = time.getHours();
              const minute = time.getMinutes();
              const second = time.getSeconds();
              return `${second < 10 ? '0' : ''}${second} \/ ${minute < 10 ? '0' : ''}${minute} \/ ${hour < 10 ? '0' : ''}${hour}`; // eslint-disable-line
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
          <TimePicker withClear />
        </ExampleBlock>
      </div>
    );
  }
}
