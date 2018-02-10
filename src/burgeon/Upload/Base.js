/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/6
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {parseFileObj, nop, upload} from './utils';

export default class Base extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    auto: PropTypes.bool,
    multiple: PropTypes.bool,
    type: PropTypes.string,
    parseFileObj: PropTypes.func,
    filterFileObj: PropTypes.func,
    data: PropTypes.object,
    headers: PropTypes.object,
    onChoose: PropTypes.func,
    onStart: PropTypes.func,
    onProgress: PropTypes.func,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    disabled: PropTypes.bool,
    withCredentials: PropTypes.bool,
    renderContent: PropTypes.func
  };

  static defaultProps = {
    auto: true,
    multiple: false,
    type: '*',
    data: {},
    headers: {},
    parseFileObj: nop,
    filterFileObj: () => true,
    onChoose: nop,
    onStart: nop,
    onProgress: nop,
    onSuccess: nop,
    onError: nop,
    disabled: false,
    withCredentials: false
  };

  constructor(props) {
    super(props);
    this.files = [];
    this.validFiles = [];
    this.refInput = null;
  }

  uploadFiles = files => {
    const {
      url,
      data,
      headers,
      onStart,
      withCredentials
    } = this.props;

    files.forEach(file => {
      if (!file.abort) {
        onStart(file);
        file.abort = upload({
          url,
          data,
          headers,
          file,
          onProgress: this.handleProgress,
          onError: this.handleError,
          onSuccess: this.handleSuccess,
          withCredentials
        }).abort;
      }
    });
  };

  abortFiles = files => {
    files.forEach(file => {
      const index = file.index;
      if (index < this.files.length) {
        if (file.abort) {
          file.abort();
        }
        file.percent = 0;
        file.abort = null;
      }
    });
    this.forceUpdate();
  };

  deleteFiles = files => {
    files.forEach(file => {
      const index = file.index;
      if (index < this.files.length) {
        if (file.abort) {
          file.abort();
        }
        this.files[index] = null;
      }
    });
    this.swapFiles();
    this.forceUpdate();
  };

  parseFile = (file, index) => {
    const {
      parseFileObj: parse
    } = this.props;

    return Object.assign({}, parseFileObj(file, index), parse(file, index));
  };

  swapFiles = () => {
    this.validFiles = this.files.filter(file => !!file);
  };

  filesToList = fileList => {
    const {
      filterFileObj: filter,
      multiple,
      onChoose
    } = this.props;

    const startIndex = this.files.length;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      if (filter(file, this.validFiles)) {
        try {
          if (multiple) {
            const f = this.parseFile(file, i + startIndex);
            this.files.push(f);
            onChoose(f);
          } else {
            const f = this.parseFile(file, 0);
            this.files = [f];
            onChoose(f);
          }
        } catch (e) {} // eslint-disable-line
      }
    }

    this.swapFiles();
  };

  triggerChoose = () => {
    this.refInput.click();
  };

  handleClick = () => {
    const {
      disabled
    } = this.props;

    if (!disabled) {
      this.triggerChoose();
    }
  };

  handleChoose = e => {
    const {
      auto
    } = this.props;

    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    this.filesToList(files);

    if (auto) {
      this.handleConfirm();
    } else {
      this.forceUpdate();
    }
  };

  handleConfirm = () => {
    this.uploadFiles(this.validFiles);
    this.forceUpdate();
  };

  handleProgress = (event, file) => {
    const {
      onProgress
    } = this.props;

    if (this.onProgress) {
      onProgress(event, file);
    }
    this.forceUpdate();
  };

  handleError = (error, body, file) => {
    const {
      onError
    } = this.props;

    if (this.onError) {
      onError(error, body, file);
    }
    this.forceUpdate();
  };

  handleSuccess = (body, file) => {
    const {
      onSuccess
    } = this.props;

    if (this.onSuccess) {
      onSuccess(body, file);
    }
    this.forceUpdate();
  };

  render() {
    const {
      type,
      multiple,
      renderContent
    } = this.props;

    return (
      <div
        className={cx(
          'hana-upload'
        )}
      >
        <input
          className={cx(
            'hana-upload-input'
          )}
          ref={ref => {
            this.refInput = ref;
          }}
          type="file"
          accept={type}
          multiple={multiple}
          onClick={e => {
            // clean value to select the same file continuous
            e.target.value = null;
          }}
          onChange={this.handleChoose}
        />
        {
          renderContent
            ? renderContent(this.validFiles)
            : this.renderContent()
        }
      </div>
    );
  }

  renderContent() {
    return null;
  }
}
