import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import remove from 'lodash/remove';
import find from 'lodash/find';
import isArray from 'lodash/isArray';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import {Tag, Icon} from '../../index';
import {getRestProps, childrenToArray} from '../../utils';

const noop = () => {};

/**
 * TODO
 *  - autoComplete
 */
export default class Select extends Component {
  static propTypes = {
    /**
     * @en
     * whether set state by itself when changed
     *
     * @cn
     * 是否开启自控模式
     */
    auto: PropTypes.bool,

    /**
     * @en
     * the select's current value
     *
     * @cn
     * 选择器当前值
     */
    value: PropTypes.any,

    /**
     * @en
     * whether the select is disabled
     *
     * @cn
     * 是否禁用
     */
    disabled: PropTypes.bool,

    /**
     * @en
     * callback when the select changed
     *
     * (Any value) => void
     *
     * @cn
     * 值改变时的回调函数
     *
     * (Any value) => void
     */
    onChange: PropTypes.func,

    /**
     * @en
     * callback when the option is selected
     *
     * (Any value, Int index, String label) => void
     *
     * @cn
     * 选取某个选项时的回调函数
     *
     * (Any value, Int index, String label) => void
     */
    onSelect: PropTypes.func,

    /**
     * @en
     * children of the select
     *
     * @cn
     * 子节点
     */
    children: PropTypes.node,

    /**
     * @en
     * default label of the select
     *
     * @cn
     * 默认展示的标签文字
     */
    defaultLabel: PropTypes.string,

    /**
     * @en
     * multiple selector
     *
     * @cn
     * 是否启用多选
     */
    multiple: PropTypes.bool,

    /**
     * @en
     * options' maxHeight
     *
     * @cn
     * 选项列表的最大高度
     */
    maxHeight: PropTypes.number,

    /**
     * @en
     * the option wrap's orientation, down or up
     *
     * @cn
     * 选项列表的朝向
     */
    orientation: PropTypes.oneOf(['down', 'up']),

    /**
     * @en
     * whether use autoUpdown to calculate the orientation, based on document.body
     *
     * @cn
     * 是否自动控制选项列表的朝向
     */
    autoUpdown: PropTypes.bool,

    /**
     * @en
     * selection's style
     *
     * @cn
     * 选择框的样式
     */
    selectionStyle: PropTypes.object,

    /**
     * @en
     * option wrap style
     *
     * @cn
     * 选项列表的样式
     */
    optionWrapStyle: PropTypes.object,

    /**
     * @en
     * arrow icon
     *
     * @cn
     * 箭头的图标
     */
    arrowIcon: PropTypes.node,

    /**
     * @en
     * the select's size
     *
     * @cn
     * 选择器的大小
     */
    size: PropTypes.oneOf(['small', 'middle', 'large']),

    /**
     * @en
     * the select's name
     *
     * @cn
     * 选择器的`name`
     */
    name: PropTypes.string,

    /**
     * @en
     * select's class
     *
     * @cn
     * 选择器的`class`
     */
    className: PropTypes.string
  };

  static defaultProps = {
    auto: false,
    defaultLabel: '',
    disabled: false,
    onChange: noop,
    onSelect: noop,
    maxHeight: 300,
    multiple: false,
    orientation: 'down',
    autoUpdown: false,
    arrowIcon: <Icon type="leaf" />,
    size: 'middle',
    name: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: props.value,
      orientation: props.orientation
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleCloseOutside, true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined) this.setState({value: nextProps.value});
  }

  componentDidUpdate(nextProps) {
    const {multiple} = nextProps;
    if (multiple) {
      this.updateMultipleWrapStyle();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleCloseOutside, true);
  }

  selection = null;
  optionWrap = null;

  handleCloseOutside = e => {
    if (!this.state.open) return;
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(e.target)) {
      this.setState({open: false});
    }
  };

  hasEnoughHeight = () => {
    const {maxHeight} = this.props;
    const domNode = ReactDOM.findDOMNode(this);
    const {bottom} = domNode.getBoundingClientRect();
    const docScroll = document.body.scrollTop;
    const docHeight = document.body.clientHeight;
    return docHeight - docScroll - bottom > maxHeight;
  };

  handleToggle = () => {
    const {orientation, disabled, autoUpdown} = this.props;
    let orient = orientation;
    if (autoUpdown) orient = this.hasEnoughHeight() ? 'down' : 'up';
    if (!disabled) {
      this.setState({
        open: !this.state.open,
        orientation: orient
      });
    }
  };

  handleSelect = (value, index, label, isSelected) => {
    const {onSelect, multiple} = this.props;
    onSelect(value, index, label);
    if (multiple) this.multiSelect(value, isSelected);
    else this.singleSelect(value);
  };

  singleSelect = value => {
    const {auto, onChange} = this.props;
    if (value !== this.state.value) {
      const nextState = {
        open: false
      };
      if (auto) nextState.value = value;
      this.setState(nextState, () => onChange(value));
    } else {
      this.setState({open: false});
    }
  };

  multiSelect = (value, isSelected) => {
    const {auto, onChange} = this.props;
    const array = this.state.value.slice(0);
    if (isSelected) remove(array, i => i === value);
    else array.push(value);

    if (auto) this.setState({value: array});
    onChange(array);
  };

  // get the options' list wrap style when multiple.
  updateMultipleWrapStyle = () => {
    const {orientation} = this.state;
    const selectionHeight = this.selection && this.selection.offsetHeight;
    const attr = orientation === 'down' ? 'top' : 'bottom';
    if (selectionHeight && this.optionWrap) {
      this.optionWrap.style[attr] = `${selectionHeight}px`;
    }
  };

  render() {
    const {open, orientation, value} = this.state;
    const {
      disabled,
      multiple,
      maxHeight,
      selectionStyle,
      optionWrapStyle,
      arrowIcon,
      size,
      name,
      className
    } = this.props;
    const cls = cx('hana-select', `hana-select-${orientation}`, `hana-select-${size}`, className, {
      'hana-select-active': open,
      'hana-select-disabled': disabled,
      'hana-select-multiple': multiple
    });
    const computedWrapStyle = Object.assign({}, optionWrapStyle, {
      maxHeight
    });
    const restProps = getRestProps(Select, this.props);
    return (
      <div className={cls} onClick={this.handleChange} {...restProps}>
        <div
          ref={c => {
            this.selection = c;
          }}
          className="hana-select-selection"
          onClick={this.handleToggle}
          style={selectionStyle}
        >
          {multiple ? this.renderMultiLabel() : this.renderSingleLabel()}
          <b className="hana-select-arrow">{arrowIcon}</b>
        </div>
        <TransitionGroup>
          {open && (
            <CSSTransition timeout={{enter: 300, exit: 300}} classNames="hana-select-transition">
              <div
                className="hana-select-optwrap"
                ref={c => {
                  this.optionWrap = c;
                }}
                style={computedWrapStyle}
              >
                {this.renderOptions()}
              </div>
            </CSSTransition>
          )}
          <CSSTransition timeout={{enter: 300, exit: 300}} classNames="hana-select-transition">
            <select name={name} multiple={multiple} type="hidden" style={{display: 'none'}} value={value}>
              <option value="" />
              {this.renderOptions(true)}
            </select>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }

  renderSingleLabel = () => {
    const {defaultLabel, children} = this.props;
    const {value} = this.state;
    let label = defaultLabel;
    childrenToArray(children).forEach(item => {
      if (item.props && item.props.value === value) label = item.props.label;
    });
    return label;
  };

  renderMultiLabel = () => {
    const {value, children} = this.props;
    const mappedChildren = childrenToArray(children);
    if (!value || !isArray(value)) return null;
    return value.map(val => {
      const option = find(mappedChildren, item => item.props.value === val);
      return option ? (
        <Tag
          hasClose
          key={option.props.value}
          onClose={e => {
            e.stopPropagation();
            this.multiSelect(option.props.value, true);
          }}
        >
          {option.props.label}
        </Tag>
      ) : null;
    });
  };

  /** render options by its children */
  renderOptions = isOrigin => {
    const {
      children, value, disabled, multiple
    } = this.props;
    return childrenToArray(children).map((item, index) => {
      const isSelected = multiple ? value.indexOf(item.props.value) > -1 : value === item.props.value;
      if (!isOrigin) {
        return React.cloneElement(item, {
          key: item.key || index,
          selected: isSelected,
          onClick: (val, label, selected) => this.handleSelect(val, index, label, selected),
          disabled: disabled || item.props.disabled
        });
      }
      return (
        <option value={item.props.value} key={item.key || index}>
          {item.props.label}
        </option>
      );
    });
  };
}
