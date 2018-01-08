import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseElement from './BaseElement';

export default class FormItem extends Component {
  static propTypes = {
    /**
     * @en
     * the formitem's children
     *
     * @cn
     * 子节点
     */
    children: PropTypes.node,

    /**
     * @en
     * the formitem's label
     *
     * @cn
     * 表单项的标签
     */
    label: PropTypes.node,

    /**
     * @en
     * the formitem's info
     *
     * @cn
     * 表单项的提示信息
     */
    info: PropTypes.node,

    /**
     * @en
     * the formitem's status
     *
     * @cn
     * 表单项的状态
     */
    status: PropTypes.oneOf(['normal', 'success', 'error', 'warn']),

    /**
     * @en
     * the formitem's label-position
     *
     * @cn
     * 表单项的标签位置
     */
    labelPosition: PropTypes.oneOf(['top', 'left']),

    /**
     * @en
     * the label's style
     *
     * @cn
     * 表单项标签的样式
     */
    labelStyle: PropTypes.object,

    /**
     * @en
     * the element's style
     *
     * @cn
     * 表单项的样式
     */
    elementStyle: PropTypes.object,

    /**
     * @en
     * the className
     *
     * @cn
     * 表单项的`class`
     */
    className: PropTypes.string
  }

  static defaultProps = {
    status: 'normal',
    label: null,
    labelPosition: 'left'
  }

  render() {
    const {children, info, status, className} = this.props;
    const cls = cx(
      className,
      'hana-form-item',
      `hana-form-item-${status}`
    );
    return (
      <BaseElement className={cls} {...this.props}>
        {children}
        <div className="hana-form-info">{info}</div>
      </BaseElement>
    );
  }
}
