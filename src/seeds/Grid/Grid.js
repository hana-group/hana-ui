import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Grid extends Component {
  static propTypes = {
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
     * Custom grid component children element
     *
     * @cn
     * 设置组件的子组件
     */
    children: PropTypes.node
  }

  render() {
    const {style, children, ...rest} = this.props;

    return (
      <div className='hana-grid' style={style} {...rest}>
        {children}
      </div>
    );
  }
}

export default Grid;
