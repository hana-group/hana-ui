import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class BaseElement extends Component {
  static propTypes = {
    /**
     * @en
     * the formGroup's children
     *
     * @cn
     * the formGroup's children
     */
    children: PropTypes.node,

    /**
     * @en
     * the label of the formGroup
     *
     * @cn
     * the label of the formGroup
     */
    label: PropTypes.node,

    /**
     * @en
     * label's position of the formGroup
     *
     * @cn
     * label's position of the formGroup
     */
    labelPosition: PropTypes.oneOf(['top', 'left']),

    /**
     * @en
     * the className
     *
     * @cn
     * the className
     */
    className: PropTypes.string,

    /**
     * @en
     * the label's style
     *
     * @cn
     * the label's style
     */
    labelStyle: PropTypes.object,

    /**
     * @en
     * the element's style
     *
     * @cn
     * the element's style
     */
    elementStyle: PropTypes.object,

    /**
     * @en
     * the styles
     *
     * @cn
     * the styles
     */
    style: PropTypes.object
  }

  render() {
    const {children, label, labelPosition, className, labelStyle, elementStyle, style} = this.props;
    const cls = cx(
      className,
      'hana-form-field',
      `hana-form-${labelPosition}`,
      {
        'hana-form-nolabel': label === null
      }
    );
    // const restProps = getRestProps(BaseElement, this.props);
    return (
      <div className={cls} style={style}>
        {label !== null && <span className="hana-form-label" style={labelStyle}>{label}</span>}
        <div className="hana-form-element" style={elementStyle}>
          {children}
        </div>
      </div>
    );
  }
}
