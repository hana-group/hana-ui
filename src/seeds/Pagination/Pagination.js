/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/9
 */
import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Text from '../Text';

export default class Pagination extends Component {
  static propTypes = {
    /**
     * @en
     * The max number of data.
     *
     * @cn
     * 数据的总数。
     */
    total: PropTypes.number,
    /**
     * @en
     * The number of data per page.
     *
     * @cn
     * 每页的数据条数。
     */
    pageSize: PropTypes.number,
    /**
     * @en
     * The max number of pages will be shown.
     *
     * @cn
     * 被显示的最大分页数量。
     */
    length: PropTypes.number,
    /**
     * @en
     * The offset value for all pages.
     *
     * @cn
     * 首页页码偏移量。
     */
    offset: PropTypes.number,
    /**
     * @en
     * Current page.
     *
     * @cn
     * 当前页码。
     */
    current: PropTypes.number,
    /**
     * @en
     * The predefined view types.
     *
     * @cn
     * 预设的组件显示样式类型。
     */
    view: PropTypes.oneOf(['box', 'circle', 'simple']),
    /**
     * @en
     * Size of component, small, middle or large.
     *
     * @cn
     * 组件的显示尺寸。
     */
    size: PropTypes.oneOf(['small', 'middle', 'large']),
    /**
     * @en
     * A handler for event 'select'.
     *
     * (currentPage, index) => {}.
     *
     * @cn
     * 页码被选择时的将会被调用的回调函数.
     *
     * (currentPage: number, index: number) => {}。
     */
    onSelect: PropTypes.func,
    /**
     * @en
     * A Icon to instead of the default previous icon.
     *
     * @cn
     * 替代默认的左侧"上一页"的图标。
     */
    preIcon: PropTypes.node,
    /**
     * @en
     * A Icon to instead of the default next icon.
     *
     * @cn
     * 替代默认的右侧"下一页"的图标。
     */
    nextIcon: PropTypes.node,
    /**
     * @en
     * If this component has a select for quick jumping to some pages.
     *
     * @cn
     * 是否要显示快速跳转框。
     */
    withQuickJumper: PropTypes.bool,
    /**
     * @en
     * If this component has a buttons for quick jumping to the first and last page.
     *
     * @cn
     * 是否要显示快速跳转到首页或者尾页的页码。
     */
    withBorderJumper: PropTypes.bool,
    /**
     * @en
     * ClassName of root element.
     *
     * @cn
     * 根元素的class。
     */
    className: PropTypes.string,
    /**
     * @en
     * Style of root element.
     *
     * @cn
     * 根元素的样式.
     */
    style: PropTypes.object,
    /**
     * @en
     * Style of each page and icon.
     *
     * @cn
     * 每一个页码元素的默认样式。
     */
    eachDefaultStyle: PropTypes.object,
    /**
     * @en
     * Style of each page and icon when it is hovered.
     *
     * @cn
     * 每一个页码元素在被Hover时的样式。
     */
    eachHoveredStyle: PropTypes.object,
    /**
     * @en
     * Style for each page and icon when it is active.
     *
     * @cn
     * 每一个页码元素在被激活时的样式。
     */
    eachActiveStyle: PropTypes.object,
    /**
     * @en
     * Style for each page and icon when it is disabled.
     *
     * @cn
     * 每一个页码元素在被禁用时的样式。
     */
    eachDisabledStyle: PropTypes.object
  };

  static defaultProps = {
    total: 0,
    pageSize: 10,
    length: 8,
    offset: 1,
    current: 1,
    view: 'box',
    size: 'middle',
    onSelect: () => {},
    preIcon: null,
    nextIcon: null,
    withQuickJumper: false,
    withBorderJumper: false,
    style: {},
    eachDefaultStyle: {},
    eachActiveStyle: {},
    eachHoveredStyle: {},
    eachDisabledStyle: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      hovered: ''
    };

    this.pageList = [];
    this.maxPage = 0;
    this.preLeft = -1;
    this.preRight = -1;
    this.index = 0;
    this.jumperIndex = undefined;
  }

  componentWillMount() {
    this.genPageList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.genPageList(nextProps);
  }

  genPageList = props => {
    const {
      total,
      offset,
      pageSize,
      length: len,
      current
    } = props;

    this.maxPage = ~~((total - 1) / pageSize);
    this.index = current - offset;
    const maxPage = this.maxPage;
    const length = len - 1;

    let left;
    let right;
    if (maxPage - this.index < length) {
      right = maxPage;
      left = right - length < 0 ? 0 : right - length;
    } else {
      left = this.index - 1 < 0 ? 0 : this.index - 1;
      right = left + length > maxPage ? maxPage : left + length;
    }

    if (this.preLeft === left && this.preRight === right) {
      return;
    }
    this.preLeft = left;
    this.preRight = right;

    const size = (right - left) + 1;
    this.pageList = new Array(size);
    for (let i = 0; i < size; i += 1) {
      this.pageList[i] = left + i;
    }
  };

  quickJump = () => {
    const value = this.jumperIndex;

    if (value === 'pre' || value === 'next') {
      return this.handleChangePage(value);
    }

    if (typeof value === 'number') {
      if (value >= 0 && value <= this.maxPage) {
        return this.handleChangePage(value);
      }
      if (value > this.maxPage) {
        return this.handleChangePage(this.maxPage);
      }
    }
  };

  handleHover = name => {
    this.setState({hovered: name});
  };

  handleClearHover = () => {
    this.setState({hovered: ''});
  };

  handleChangePage = value => {
    const {
      onSelect,
      offset
    } = this.props;

    let page = value;
    if (value === 'pre') {
      page = this.index - 1;
    } else if (value === 'next') {
      page = this.index + 1;
    }

    onSelect(page + offset, page);
  };

  render() {
    const {
      withQuickJumper,
      withBorderJumper,
      className,
      style
    } = this.props;

    return (
      <ul
        className={cx(
          'hana-pagination',
          className
        )}
        style={style}
      >
        {this.renderIcon('pre')}
        {withBorderJumper && this.renderFirstJumper()}
        {this.renderList()}
        {withBorderJumper && this.renderLastJumper()}
        {this.renderIcon('next')}
        {withQuickJumper && this.renderQuickJumper()}
      </ul>
    );
  }

  renderButton = (type, value, node) => {
    const {
      view,
      size,
      eachDefaultStyle,
      eachHoveredStyle,
      eachDisabledStyle,
      eachActiveStyle
    } = this.props;

    const current = this.index;

    let disabled = false;
    if (type === 'icon') {
      disabled = value === 'pre'
        ? current <= 0
        : current >= this.maxPage;
    }

    const active = type === 'page' && value === current;
    const hovered = value === this.state.hovered;

    return (
      <li
        key={value}
        className={cx(
          'hana-pagination-each',
          `hana-pagination-${type}`,
          `hana-pagination-each-${view}`,
          `hana-pagination-each-${size}`,
          !disabled && hovered && 'hana-pagination-each-hover',
          active && 'hana-pagination-each-active',
          disabled && 'hana-pagination-each-disabled',
        )}
        style={Object.assign(
          {},
          eachDefaultStyle,
          hovered && eachHoveredStyle,
          active && eachActiveStyle,
          disabled && eachDisabledStyle
        )}
        onClick={() => !disabled && this.handleChangePage(value)}
        onMouseEnter={() => !disabled && this.handleHover(value)}
        onMouseLeave={() => !disabled && this.handleClearHover()}
      >
        {cloneElement(['string', 'number'].includes(typeof node) ? <span>{node}</span> : node)}
      </li>
    );
  };

  renderList = () => {
    const {
      offset
    } = this.props;

    return this.pageList.map(page =>
      this.renderButton('page', page, page + offset)
    );
  };

  renderIcon = type => {
    const {
      preIcon,
      nextIcon
    } = this.props;

    const icon = type === 'pre' ? preIcon : nextIcon;
    const node = icon || (
      <span
        className={cx(
          `hana-pagination-icon-default-${type}`
        )}
      />
    );

    return this.renderButton('icon', type, node);
  };

  renderQuickJumper = () => {
    const {
      offset,
      size,
      eachDefaultStyle
    } = this.props;

    return (
      <li
        className={cx(
          `hana-pagination-each-${size}`,
          'hana-pagination-jumper'
        )}
      >
        <Text
          auto
          type={'int'}
          iconPosition={'after'}
          icon={'Go'}
          view={'box'}
          size={size}
          style={Object.assign({}, eachDefaultStyle)}
          onChange={(e, value) => {
            this.jumperIndex = value - offset;
          }}
          onSubmit={this.quickJump}
        />
      </li>
    );
  };

  renderFirstJumper = () => {
    const {
      offset,
      size,
      eachDefaultStyle
    } = this.props;

    if (this.pageList[0] <= 0) {
      return null;
    }

    return [
      this.renderButton('page', 0, offset),
      <li
        key={1}
        className={cx(
          'hana-pagination-each',
          `hana-pagination-each-${size}`
        )}
        style={eachDefaultStyle}
      >
        ...
      </li>
    ];
  };

  renderLastJumper = () => {
    const {
      offset,
      size,
      eachDefaultStyle
    } = this.props;

    if (this.pageList[this.pageList.length - 1] >= this.maxPage) {
      return null;
    }

    return [
      <li
        key={0}
        className={cx(
          'hana-pagination-each',
          `hana-pagination-each-${size}`
        )}
        style={eachDefaultStyle}
      >
        ...
      </li>,
      this.renderButton('page', this.maxPage, this.maxPage + offset)
    ];
  };
}
