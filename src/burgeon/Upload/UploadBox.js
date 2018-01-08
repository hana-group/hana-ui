/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/8
 */
import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import cx from 'classnames';
import Base from './Base';

import {parseFileObj} from './utils';

export default class UploadBox extends Base {
  cancel = e => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  };

  parseFile = (file, index) => {
    const {parseFileObj: parse} = this.props;

    const f = Object.assign({}, parseFileObj(file, index), parse(file, index));

    if (/^image.*/.test(f.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        f.preview = reader.result;
        this.forceUpdate();
      };
      reader.readAsDataURL(f.file);
    }
    return f;
  };

  handleDrop = e => {
    this.cancel(e);
    this.handleChoose(e);
  };

  renderContent() {
    return (
      <div
        className={cx('hana-upload-box')}
        onDragEnter={this.cancel}
        onDragOver={this.cancel}
        onDrop={this.handleDrop}
      >
        {this.renderList()}
        <div className={cx('hana-upload-box-top')}>
          {this.renderChooser()}
          {this.renderConfirm()}
        </div>
      </div>
    );
  }

  renderChooser = () => {
    const {auto} = this.props;

    return (
      <div className={cx('hana-upload-box-select')}>
        <div onClick={this.handleClick}>{auto ? 'Upload' : 'Select'}</div>
      </div>
    );
  };

  renderConfirm = () => {
    const {auto} = this.props;

    if (!auto) {
      return (
        <div className={cx('hana-upload-box-confirm')}>
          <div onClick={this.handleConfirm}>Upload</div>
        </div>
      );
    }

    return null;
  };

  renderList = () => {
    const {auto, multiple} = this.props;

    if ((!auto && !multiple) || this.validFiles.length === 0) {
      return null;
    }

    return (
      <TransitionGroup className={cx('hana-upload-box-list')}>
        {this.validFiles.map(this.renderListItem)}
      </TransitionGroup>
    );
  };

  renderListItem = file => (
    <CSSTransition key={file.index} className="hana-upload-box-list-item" timeout={{enter: 500, exit: 300}}>
      <div>
        {file.preview ? (
          <div
            className={cx('hana-upload-box-list-item-preview')}
            style={{backgroundImage: `url(${file.preview})`}}
          />
        ) : (
          <div className={cx('hana-upload-box-list-item-icon')} />
        )}
        <div className={cx('hana-upload-box-list-item-content')}>
          <div className={cx('hana-upload-box-list-item-progress')}>
            <div
              className={cx(`hana-upload-box-list-item-progress-${file.state}`)}
              style={{
                width: `${file.percent}%`
              }}
            />
            <div
              className={cx('hana-upload-box-list-item-progress-after')}
              style={{
                width: `${100 - file.percent}%`
              }}
            />
          </div>
          <div className={cx('hana-upload-box-list-item-name')}>{file.name}</div>
        </div>
        <div className={cx('hana-upload-box-list-item-fn-mask')}>
          <span className={cx('hana-upload-box-list-item-delete')} onClick={() => this.deleteFiles([file])} />
        </div>
      </div>
    </CSSTransition>
  );
}
