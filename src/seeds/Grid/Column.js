import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Column extends Component {
  static propTypes = {
    /**
     * @en
     * Setting layout take column's number
     *
     * @cn
     * 删格所占列数
     */
    col: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    /**
     * @en
     * Custom component style
     *
     * @cn
     * 自定义组件样式
     */
    style: PropTypes.object,
    /**
     * @en
     * Setting column component children element
     *
     * @cn
     * 设置组件的子组件
     */
    children: PropTypes.node
  }

  render() {
    const {col, style, children, ...other} = this.props;

    return (
      <div style={style} className={`hana-grid-${col}`} {...other}>
        {children}
      </div>
    );
  }
}

export default Column;
