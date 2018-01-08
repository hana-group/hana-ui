import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseElement from './BaseElement';

export default class FormGroup extends Component {
  static propTypes = {
    /**
     * @en
     * the formGroup's children
     *
     * @cn
     * 子节点
     */
    children: PropTypes.node,

    /**
     * @en
     * the label of the formGroup
     *
     * @cn
     * `FormGroup`的标签
     */
    label: PropTypes.node,

    /**
     * @en
     * label's position of the formGroup
     *
     * @cn
     * `FormGroup`的标签位置
     */
    labelPosition: PropTypes.oneOf(['top', 'left']),

    /**
     * @en
     * the className
     *
     * @cn
     * `FormGroup`的`class`
     */
    className: PropTypes.string,

    /**
     * @en
     * the label's style
     *
     * @cn
     * `FormGroup`的标签样式
     */
    labelStyle: PropTypes.object,

    /**
     * @en
     * the element's style
     *
     * @cn
     * `FormGroup`的元素样式
     */
    elementStyle: PropTypes.object,

    /**
     * @en
     * the form-group's style
     *
     * @cn
     * `FormGroup`的样式
     */
    style: PropTypes.object
  }

  static defaultProps = {
    label: null,
    labelPosition: 'left'
  }

  render() {
    const {children, className} = this.props;
    const cls = cx(
      className,
      'hana-form-group',
    );
    // const restProps = getRestProps(FormGroup, this.props);
    return (
      <BaseElement className={cls} {...this.props}>
        {children}
      </BaseElement>
    );
  }
}
