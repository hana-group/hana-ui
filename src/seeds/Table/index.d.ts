/// <reference types="react" />
import {Component} from 'react';

export interface Props {
  tableTitle?: string;
  tableHeader?: string[];
  tableData?: string[];
  showRowIndex?: boolean;
  showCheckbox?: boolean;
  showAllCheckbox?: boolean;
  colSequence?: (() => void)[];
  colAlign?: string[];
  onRowClick?: () => void;
  hoverable?: boolean;
  selectable?: boolean;
  selectedRow?: (() => void)[];
  columnWidth?: string[];
  style?: any;
  headerStyle?: any;
  bodyStyle?: any;
  children?: JSX.Element
}

export interface States {
}

export default class Table extends Component<Props, States> {
    static defaultProps: Props;
    render(): JSX.Element;
}