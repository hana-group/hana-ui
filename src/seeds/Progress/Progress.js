import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
// import {Icon} from '../../index';

import getRestProps from '../../utils/getRestProps';


// TODO add a icon
export default class Progress extends Component {
  static propTypes = {
    /**
     * @en
     * the percent of the progress
     *
     * @cn
     * 进度条的百分比
     */
    value: PropTypes.number,

    /**
     * @en
     * the progress's color
     *
     * @cn
     * 进度条的颜色
     */
    color: PropTypes.string,

    /**
     * @en
     * the font's color
     *
     * @cn
     * 进度条文字颜色
     */
    fontColor: PropTypes.string,

    /**
     * @en
     * the progress's size
     *
     * @cn
     * 进度条尺寸
     */
    size: PropTypes.oneOf(['small', 'middle', 'large']),

    /**
     * @en
     * the icon's size
     *
     * @cn
     * the icon's size
     */
    // icon: PropTypes.node,

    /**
     * @en
     * the min percent of the progress
     *
     * @cn
     * 进度条的最小值
     */
    min: PropTypes.number,

    /**
     * @en
     * the max percent of the progress
     *
     * @cn
     * 进度条的最大值
     */
    max: PropTypes.number
  }

  static defaultProps = {
    value: 0,
    min: 0,
    max: 100,
    size: 'middle'
    // icon: <Icon type="yukibana-o" />
  }

  formatValue = () => {
    const {value, min, max} = this.props;
    if (value < min) return min;
    else if (value > max) return max;
    return value;
  }

  render() {
    const {color, fontColor, size} = this.props;
    const cls = cx('hana-progress', `hana-progress-${size}`);
    const computedPercent = this.formatValue();
    const restProps = getRestProps(Progress, this.props);
    return (
      <div className={cls} {...restProps}>
        <div className="hana-progress-inner" style={{width: `${computedPercent}%`, backgroundColor: color}}>
          <div className="hana-progress-icon" style={{color: fontColor}}>
            <p className="hana-progress-percent">{computedPercent}%</p>
            {/** icon */}
          </div>
        </div>
      </div>
    );
  }
}
