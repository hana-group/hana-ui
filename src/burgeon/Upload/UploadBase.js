/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/7
 */
import React from 'react';
import cx from 'classnames';
import Base from './Base';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {Button} from '../../seeds/Button';

export default class UploadBase extends Base {
  renderContent() {
    return (
      <div className={cx('hana-upload-base')}>
        <div className={cx('hana-upload-base-top')}>
          {this.renderChooser()}
          {this.renderConfirm()}
        </div>
        {this.renderList()}
      </div>
    );
  }

  renderChooser = () => {
    const {auto} = this.props;

    return (
      <div className={cx('hana-upload-base-select')}>
        <Button onClick={this.handleClick}>{auto ? 'Upload' : 'Select'}</Button>
      </div>
    );
  };

  renderConfirm = () => {
    const {auto} = this.props;

    if (!auto) {
      return (
        <div className={cx('hana-upload-base-confirm')}>
          <Button onClick={this.handleConfirm}>Upload</Button>
        </div>
      );
    }

    return null;
  };

  renderList = () => {
    const {auto, multiple} = this.props;

    return (
      <TransitionGroup>
        {!((auto && !multiple) || this.validFiles.length === 0) && (
          <CSSTransition classNames="hana-upload-base-list" timeout={{enter: 500, exit: 400}}>
            <TransitionGroup>{this.validFiles.map(this.renderListItem)}</TransitionGroup>
          </CSSTransition>
        )}
      </TransitionGroup>
    );
  };

  renderListItem = file => (
    <CSSTransition key={file.index} classNames="hana-upload-base-list-item" timeout={{enter: 400, exit: 300}}>
      <div className={cx('hana-upload-base-list-item')}>
        <span className={cx('hana-upload-base-list-item-icon')} />
        <span className={cx('hana-upload-base-list-item-content')}>
          <div className={cx('hana-upload-base-list-item-name')}>{file.name}</div>
          <div className={cx('hana-upload-base-list-item-progress')}>
            <div
              className={cx(`hana-upload-base-list-item-progress-${file.state}`)}
              style={{
                width: `${file.percent}%`
              }}
            />
            <div
              className={cx('hana-upload-base-list-item-progress-after')}
              style={{
                width: `${100 - file.percent}%`
              }}
            />
          </div>
          <span className={cx('hana-upload-base-list-item-delete')} onClick={() => this.deleteFiles([file])} />
        </span>
      </div>
    </CSSTransition>
  );
}
