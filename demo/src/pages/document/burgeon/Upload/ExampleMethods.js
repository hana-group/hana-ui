/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/9
 */
import React, {Component} from 'react';
import {Upload, Checkbox, Text} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Methods
 *
 * hana provides some methods to make file upload more flexible.
 *
 * Property `type` could constants the file type when selecting,
 * and the `disable` could disable this component.
 * If you want more constants after selecting, please check the `filterFileObj`.
 *
 * Use `parseFileObj` to add your custom attributes to file-object.
 *
 * @cn
 * 方法
 *
 * hana提供了一些方法来使得文件上传工作更加丰富多彩。
 *
 * `type`属性可以约束文件在`选择时`的类型，`disabled`则可以禁用上传组件。
 * 如果想在做出选择后进行更多的约束，你可以使用`filterFileObj`方法来进行过滤。
 *
 * `parseFileObj`方法则可以为文件对象添加自定义的属性，比如传输时的数据（详见属性定义）。
 */
export default class ExampleMethods extends Component {
  state = {
    type: '*',
    disabled: false,
    enableFilter: false,
    filterNameRegex: '.*\\.png$',
    enableParser: false,
    modifiedFileName: 'hayami'
  };

  render() {
    const {
      type,
      disabled,
      enableFilter,
      filterNameRegex,
      enableParser,
      modifiedFileName
    } = this.state;

    const filter = file => {
      if (!enableFilter) {
        return true;
      }

      return new RegExp(filterNameRegex, 'g').test(file.name);
    };

    const parser = () => {
      if (!enableParser) {
        return {};
      }

      return {name: modifiedFileName};
    };

    return (
      <div>
        <ExampleBlock>
          <div
            style={{
              width: 420,
              marginBottom: 24
            }}
          >
            <Checkbox
              style={{
                marginRight: 24
              }}
              label={'disabled'}
              checked={disabled}
              onChange={() => this.setState({disabled: !disabled})}
            />
            <div
              style={{
                display: 'inline-block',
                marginLeft: 24
              }}
            >
              <Text
                icon={'type'}
                value={type}
                onChange={(e, value) => this.setState({type: value})}
              />
            </div>
          </div>
          <div
            style={{
              width: 420,
              marginBottom: 24
            }}
          >
            <Checkbox
              label={'enableFilter'}
              checked={enableFilter}
              onChange={() => this.setState({enableFilter: !enableFilter})}
            />
            <div
              style={{
                display: 'inline-block',
                marginLeft: 24
              }}
            >
              <Text
                icon={'filterNameRegex'}
                value={filterNameRegex}
                onChange={(e, value) => this.setState({filterNameRegex: value})}
              />
            </div>
          </div>
          <div
            style={{
              width: 460,
              marginBottom: 24
            }}
          >
            <Checkbox
              label={'enableParser'}
              checked={enableParser}
              onChange={() => this.setState({enableParser: !enableParser})}
            />
            <div
              style={{
                display: 'inline-block',
                marginLeft: 24
              }}
            >
              <Text
                icon={'modifiedFileName'}
                value={modifiedFileName}
                onChange={(e, value) => this.setState({modifiedFileName: value})}
              />
            </div>
          </div>
          <div
            style={{
              width: 320
            }}
          >
            <Upload
              auto={false}
              multiple
              disabled={disabled}
              type={type}
              filterFileObj={filter}
              parseFileObj={parser}
              url={'/upload'}
              withCredentials
            />
          </div>
        </ExampleBlock>
      </div>
    );
  }
}
