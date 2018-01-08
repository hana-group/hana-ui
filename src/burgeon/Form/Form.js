import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {getRestProps} from '../../utils';

// TODO validation
export default class Form extends Component {
  static propTypes = {
    /**
     * @en
     * the form's children
     *
     * @cn
     * 表单的子元素
     */
    children: PropTypes.node,

    /**
     * @en
     * when form is submitted
     *
     * @cn
     * 表单提交时的回调
     */
    onSubmit: PropTypes.func,

    /**
     * @en
     * the form-label's postion
     *
     * @cn
     * 表单元素标签的位置
     */
    labelPosition: PropTypes.oneOf(['top', 'left']),

    /**
     * @en
     * the className
     *
     * @cn
     * 表单的`class`
     */
    className: PropTypes.string
  }

  static defaultProps = {
    labelPosition: 'left'
  }

  render() {
    const {children, onSubmit, labelPosition, className} = this.props;
    const cls = cx(className, 'hana-form', `hana-form-${labelPosition}`);
    const restProps = getRestProps(Form, this.props);
    return (
      <form className={cls} {...restProps} onSubmit={onSubmit}>
        {children}
      </form>
    );
  }
}
