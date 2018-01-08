/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/10
 */
import React, {Component} from 'react';
import {UploadBase, Button} from 'hana-ui';
import cx from 'classnames';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Customizations
 *
 * hana knows these two predefined view types may not meet your demand,
 * there is a way to customize your view.
 *
 * In this way, property `renderContent` is the most important method,
 * hana will pass all current files to her, and expect a `node` as result.
 *
 * You could bind some methods to this `node`,
 * and call methods of `Upload` component by `ref` in them.
 *
 * hana provides following methods：
 *
 * 1. `triggerChoose`: () => void，bring up the file selection dialog
 * 2. `uploadFiles`: files: Array => void, upload all files of `files`
 * 3. `abortFiles`: files: Array => void, abort all files' uploading of `files`
 * 4. `deleteFiles`: files: Array => void, delete all files of `files`
 *
 * @cn
 * 定制化
 *
 * hana也觉得这两种基础的视图无法满足很多需求，所以提供了一种方式来自定义显示的元素。
 *
 * 在这种方式中，核心的方法是`renderContent`属性，其传入当前所有的文件作为参数，返回要显示的组件。
 * 你可以向组件中的元素绑定一些方法，并在这些方法中使用引用`ref`调用`Upload`组件中的方法，以此完成需要的操作。
 *
 * hana提供了如下几个方法：
 * 1. `triggerChoose`：() => void，触发文件选择，调用后弹出文件选择器
 * 2. `uploadFiles`：files: Array => void，上传`files`中的所有文件
 * 3. `abortFiles`：files: Array => void，取消上传`files`中的所有文件
 * 4. `deleteFiles`：files: Array => void，删除`files`中的所有文件
 */
export default class ExampleCustom extends Component {
  parseFile = file => {
    const preview = {};

    if (/^image.*/.test(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        preview.image = reader.result;
        this.forceUpdate();
      };
      reader.readAsDataURL(file);
    }
    return {preview};
  };

  handleChoose = () => {
    this.refs.upload.triggerChoose();
  };

  handleUpload = files => {
    this.refs.upload.uploadFiles(files);
  };

  handleAbort = files => {
    this.refs.upload.abortFiles(files);
  };

  handleClear = files => {
    this.refs.upload.deleteFiles(files);
  };

  render() {
    return (
      <div>
        <ExampleBlock>
          <UploadBase
            ref={'upload'}
            auto={false}
            parseFileObj={this.parseFile}
            multiple
            url={'/upload'}
            renderContent={this.renderContent}
          />
        </ExampleBlock>
      </div>
    );
  }

  renderContent = files => (
    <div>
      {this.renderActions(files)}
      {this.renderList(files)}
    </div>
  );

  renderActions = files => (
    <div>
      <Button
        onClick={this.handleChoose}
        style={{
          marginRight: 8
        }}
      >
        Select
      </Button>
      <Button
        onClick={() => this.handleUpload(files)}
        style={{
          marginRight: 8
        }}
      >
        Upload
      </Button>
      <Button
        onClick={() => this.handleAbort(files)}
        style={{
          marginRight: 8
        }}
      >
        Abort
      </Button>
      <Button
        onClick={() => this.handleClear(files)}
      >
        Clear
      </Button>
    </div>
  );

  renderList = files => (
    <div
      className={cx(
        'hana-upload-box-list'
      )}
      style={{
        border: '1px solid #ddd',
        width: 480,
        height: 240,
        borderRadius: 6,
        marginTop: 4
      }}
    >
      {
        files.map(file =>
          this.renderListItem(file)
        )
      }
    </div>
  );

  renderListItem = file => (
    <div
      key={file.index}
      className={cx(
        'hana-upload-box-list-item'
      )}
    >
      {
        file.preview.image
          ? (
          <div
            className={cx(
              'hana-upload-box-list-item-preview'
            )}
            style={{backgroundImage: `url(${file.preview.image})`}}
          >
          </div>
        )
        : (
          <div
            className={cx(
              'hana-upload-box-list-item-icon'
            )}
          >
          </div>
        )
      }
      <div
        className={cx(
          'hana-upload-box-list-item-content'
        )}
      >
        <div
          className={cx(
            'hana-upload-box-list-item-progress'
          )}
        >
          <div
            className={cx(
              `hana-upload-box-list-item-progress-${file.state}`
            )}
            style={{
              width: `${file.percent}%`
            }}
          >
          </div>
          <div
            className={cx(
              'hana-upload-box-list-item-progress-after'
            )}
            style={{
              width: `${100 - file.percent}%`
            }}
          >
          </div>
        </div>
        <div
          className={cx(
            'hana-upload-box-list-item-name'
          )}
        >
          {file.name}
        </div>
      </div>
    </div>
  );
}
