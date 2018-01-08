import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// TODO mode --- random transform: rotate or clothesline type

export default class PostcardGroup extends Component {
  static propTypes = {
    /**
     * @en
     * children of the group
     *
     * @cn
     * 子节点
     */
    children: PropTypes.node,

    /**
     * @en
     * height of group
     *
     * @cn
     * `PostcardGroup`的高度
     */
    height: PropTypes.number,

    /**
     * @en
     * display mode of the Postcard Group
     *
     * @cn
     * `PostcardGroup`的显示模式
     */
    mode: PropTypes.oneOf(['normal', 'random', 'clothesline'])
  }

  static defaultProps = {
    mode: 'normal'
  }

  render() {
    const {height, mode} = this.props;
    const cls = cx('hana-postcard-group', `hana-postcard-group-${mode}`);
    // const computedStyle = Object.assign({}, style, {color});
    // const restProps = getRestProps(PostcardGroup, this.props);
    return (
      <div className={cls} style={{height}}>
        {this.renderPostcards()}
      </div>
    );
  }

  renderPostcards = () => {
    const {children} = this.props;
    if (!children) return null;
    return children.map(
      (item, index) => {
        // const deg = random(-20, 20);
        // const left = (index % 3) * 200 + random(-50, 50);
        // const top = Math.floor(index / 3) * 200 + random(-50, 50);
        const style = Object.assign({
          // transform: `rotate(${deg}deg)`
          // position: 'absolute',
          // left,
          // top
        }, item.props.style);
        return React.cloneElement(item, {
          key: index,
          style
        });
      }
    );
  }
}
