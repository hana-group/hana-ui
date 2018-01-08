import React, {Component, isValidElement} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import range from 'lodash/range';
import xor from 'lodash/xor';
import {Checkbox} from '../Checkbox';

const getColumnKey = (item, index) => item.key || item.id || index;

class Table extends Component {
  static propTypes = {
    /**
     * @en
     * Show table caption tag
     *
     * @cn
     * 显示表格caption 标签
     */
    tableTitle: PropTypes.string,
    /**
     * @en
     * Custom table title for each column as <th /> tag
     *
     * @cn
     * 自定义表格表头单元格
     */
    tableHeader: PropTypes.array,
    /**
     * @en
     * Custom table row data
     *
     * @cn
     * 自定义行数据
     */
    tableData: PropTypes.array,
    /**
     * @en
     * Whether show index of table row data
     *
     * @cn
     * 显示表格每一行数据的索引
     */
    showRowIndex: PropTypes.bool,
    /**
     * @en
     * Whether show checkbox of table row data
     *
     * @cn
     * 在表格每一行显示checkbox
     */
    showCheckbox: PropTypes.bool,
    /**
     * @en
     * Whether show checkbox in table header row
     *
     * @cn
     * 在表格表头行显示checkbox，点击全选
     */
    showAllCheckbox: PropTypes.bool,
    /**
     * @en
     * Custom display table body column sequence, if not set will auto render row by tableData
     *
     * @cn
     * 自定义表格内容列排序，如果为空将自动遍历tableData 的数据
     */
    colSequence: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    /**
     * @en
     * Setting column align one of 'left','center','right'
     *
     * @cn
     * 设置表单行数据的对齐方式，可选配置：'left','center','right'
     */
    colAlign: PropTypes.oneOf(['left', 'center', 'right']),
    /**
     * @en
     * Custom row click event, return (event, index, columnData) => {}
     *
     * @cn
     * 自定义表单行点击事件
     */
    onRowClick: PropTypes.func,
    /**
     * @en
     * Whether show row hover effect
     *
     * @cn
     * 显示行hover 效果
     */
    hoverable: PropTypes.bool,
    /**
     * @en
     * Whether can select row
     *
     * @cn
     * 控制行数据是否可选
     */
    selectable: PropTypes.bool,
    /**
     * @en
     * Return all selected row(s) list array, each list item include row element and its index
     *
     * @cn
     * 返回所选行数据数组，每一个元素包括dom 及其所在索引值
     */
    selectedRow: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    /**
     * @en
     * Custom table width for specify column
     *
     * @cn
     * 自定义特定行的宽度
     */
    columnWidth: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    /**
     * @en
     * Custom table style
     *
     * @cn
     * 自定义表格样式
     */
    style: PropTypes.object,
    /**
     * @en
     * Custom table header style
     *
     * @cn
     * 自定义表格表头样式
     */
    headerStyle: PropTypes.object,
    /**
     * @en
     * Custom table body style
     *
     * @cn
     * 自定义表格主体样式
     */
    bodyStyle: PropTypes.object,
    /**
     * @en
     * Setting component children element
     *
     * @cn
     * 设置组件的子组件
     */
    children: PropTypes.node
  };

  static defaultProps = {
    showRowIndex: false,
    showCheckbox: false,
    showAllCheckbox: false,
    colAlign: 'center',
    selectable: false,
    hoverable: false
  };

  state = {
    selectedRow: []
  };

  constructor() {
    super();
    this.isGridLayout = false;
  }

  componentWillMount() {
    const {columnWidth} = this.props;
    if (columnWidth === 'auto') {
      this.isGridLayout = true;
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextSelected = nextProps.selectedRow;
    const thisSelected = this.state.selectedRow;
    if (Array.isArray(nextSelected) && Array.isArray(thisSelected) && !isEqual(nextSelected, thisSelected)) {
      this.setState({selectedRow: nextSelected});
    }
  }

  componentDidUpdate() {
    const {selectedRow} = this.props;
    if (typeof selectedRow === 'function') {
      const elementList = document.getElementsByClassName('hana-table-body-row'); // TODO
      const result = [];
      for (let i = 0, len = elementList.length; i < len; i += 1) {
        if (this.state.selectedRow.indexOf(i) > -1) {
          result.push({
            ele: elementList[i],
            index: i
          });
        }
      }
      selectedRow(result);
    }
  }

  /*
   * Handler click event for each table row
   * @param {object} e - on click event
   * @param {number} index - row index of table body list
   */
  handleRowClick(e, index, item) {
    e.stopPropagation();
    const {onRowClick, selectable} = this.props;
    if (onRowClick) {
      onRowClick(e, index, item);
    }
    if (!selectable) return;
    const selectedRow = xor([Number(index)], this.state.selectedRow);
    this.setState({selectedRow});
  }

  handleSelectAllRow(e, isChecked) {
    const {tableData, onRowClick} = this.props;
    let selected = [];
    if (isChecked) {
      selected = range(tableData.length);
    }
    this.setState({selectedRow: selected});
    onRowClick && onRowClick(e, selected, tableData);
  }

  isSelected(index) {
    return this.state.selectedRow.indexOf(index) > -1;
  }

  isSelectedAll() {
    const {tableData} = this.props;
    return (tableData.length > 0 && tableData.length === this.state.selectedRow.length) || false;
  }

  handleColSequence = (colSequence, item, rowIndex, gridClassname, columnStyleArray) => {
    let arr = colSequence;
    const {colAlign} = this.props;

    if (isFunction(colSequence)) {
      arr = colSequence();
    }

    return arr.map((i, index) => {
      let node = '';
      if (isValidElement(i)) {
        const result = [];
        const children = i.props.children;

        // case for when an element children is function which will use current row to return new element
        if (typeof children === 'object') {
          result.push(this.renderRowChild(children, item, rowIndex));
        } else if (isFunction(children)) {
          const el = children(item, rowIndex);
          result.push(this.renderRowChild(el, item, rowIndex));
        }

        node = !~~result.length ? i : result;
      } else if (isFunction(i)) {
        const el = i(item, rowIndex);
        if (Array.isArray(el)) {
          node = (
            <table>
              <tbody>
                <tr>{this.handleColSequence(el, i, index, [], [])}</tr>
              </tbody>
            </table>
          );
        } else {
          node = !isValidElement(el) ? <el /> : el;
        }
      } else if (typeof i === 'object' && i.key) {
        // show column default value if item[i] is undefined or null
        // also note that key field can be a valid element
        node = isValidElement(i.key) ? i.key : (item[i.key] && item[i.key]) || i.defaultValue;
      } else {
        node = item[i] || item[i] === 0 ? item[i] : i;
      }

      return (
        <td
          key={`row-${i.id || index}-2`}
          className={cx(gridClassname[index] && gridClassname[index])}
          style={Object.assign({}, {textAlign: colAlign}, columnStyleArray[index])}
        >
          {node}
        </td>
      );
    });
  };

  handleCheckBoxClick = e => {
    const {index, item} = e.currentTarget.dataset;
    this.handleRowClick(e, index, item);
  };

  render() {
    const {style, bodyStyle, children} = this.props;
    const prefix = 'hana-table';

    return (
      <div>
        <table className={prefix} style={Object.assign({}, style, this.isGridLayout && {tableLayout: 'fixed'})}>
          {this.renderTitle()}
          <thead>{this.renderHeader()}</thead>
          <tbody style={bodyStyle}>{this.renderBody()}</tbody>
        </table>
        <div>{children}</div>
      </div>
    );
  }

  renderTitle() {
    const {tableTitle} = this.props;

    if (!tableTitle) return;

    return <caption>{tableTitle}</caption>;
  }

  renderHeader() {
    const {tableHeader, headerStyle, showRowIndex, showCheckbox, showAllCheckbox} = this.props;
    if (!tableHeader || !~~tableHeader.length) return;
    const thStyle = this.isGridLayout ? {display: 'table', width: '100%'} : {};

    return (
      <tr style={thStyle}>
        {showAllCheckbox ? (
          <th>
            <Checkbox
              checked={this.isSelectedAll()}
              onChange={(e, isChecked) => this.handleSelectAllRow(e, isChecked)}
            />
          </th>
        ) : (
          showCheckbox && <th />
        )}
        {showRowIndex && <th style={headerStyle}>index</th>}
        {tableHeader.map((item, index) => (
          <th key={`th-${getColumnKey(item, index)}`} style={headerStyle}>
            {item}
          </th>
        ))}
      </tr>
    );
  }

  renderBody() {
    let gridClassname = [];
    const columnStyleArray = [];
    const {showRowIndex, hoverable, tableData, colAlign, columnWidth} = this.props;
    const prefix = 'hana-table';
    const dataLength = tableData[0] && Object.keys(tableData[0]).length;
    const selectedColor = 'rgba(204, 204, 204, .45)';

    // TODO: support custom each column style
    // handle for each column width
    if (!tableData || !~~dataLength) return;
    if (isArray(columnWidth)) {
      // TODO: case for -> [2, {index: 1, grid: 5}], [{...}, {...}, ...]
      // columnWidth.slice(1).forEach(item => {
      //   gridClassname[item.index - 1] = `hana-grid-${item.grid}`;
      // });
      columnWidth.forEach(i => {
        columnStyleArray[i.index - 1] = {width: i.width};
      });
    } else if (columnWidth === 'auto') {
      gridClassname = Array(dataLength).fill(`hana-grid-${Math.floor(12 / dataLength)}`);
    } else if (!isNaN(columnWidth)) {
      gridClassname = Array(dataLength).fill(`hana-grid-${columnWidth}`);
    }

    return tableData.map((item, index) => (
      <tr
        key={`col-${getColumnKey(item, index)}`}
        className={cx(`${prefix}-body-row`, this.isGridLayout && 'hana-grid', hoverable && `${prefix}-row-hover`)}
        style={{
          backgroundColor: this.isSelected(index) ? selectedColor : 'inherit'
        }}
        onClick={e => this.handleRowClick(e, index, item)}
      >
        {this.renderBodyCheckbox(item, index)}
        {showRowIndex && (
          <td key={`row-posi-${getColumnKey(item, index)}`} style={{textAlign: colAlign}}>
            {index + 1}
          </td>
        )}
        {this.renderBodyRow(item, index, gridClassname, columnStyleArray)}
      </tr>
    ));
  }

  renderBodyCheckbox(item, index) {
    const {showCheckbox, colAlign} = this.props;
    if (!showCheckbox) return;

    return (
      <td key={`checkbox-${getColumnKey(item, index)}`} style={{textAlign: colAlign}}>
        <Checkbox
          checked={this.isSelected(index)}
          onChange={this.handleCheckBoxClick}
          data-index={index}
          data-item={item}
        />
      </td>
    );
  }

  renderRowChild = (children, item, rowIndex) => {
    const result = [];
    children.forEach((n, idx) => {
      const child = children[idx];
      let el = child;
      if (isFunction(child)) {
        el = child(item, rowIndex);
        if (Array.isArray(el)) {
          el.forEach(e => {
            result.push(!isValidElement(e) ? <e /> : e);
          });
        } else {
          result.push(el && !isValidElement(el) ? <el /> : el);
        }
      } else {
        result.push(n);
      }
    });
    return result;
  };

  renderBodyRow(item, rowIndex, gridClassname, columnStyleArray) {
    const {colAlign, colSequence} = this.props;
    return !colSequence
      ? Object.keys(item).map((i, index) => (
        <td
          key={`row-${getColumnKey(item, index)}`}
          className={cx(gridClassname[index] && gridClassname[index])}
          style={Object.assign({}, {textAlign: colAlign}, columnStyleArray[index])}
        >
          {item[i]}
        </td>
        ))
      : this.handleColSequence(colSequence, item, rowIndex, gridClassname, columnStyleArray);
  }
}

export default Table;
