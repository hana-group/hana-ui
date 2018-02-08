/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 7 Feb 2018
 * Description:
 */
/// <reference types="react" />
import {Component} from 'react';

export interface IPropTypes {
  total?: number;
  pageSize?: number;
  length?: number;
  offset?: number;
  current?: number;
  view?: 'box' | 'circle' | 'simple';
  size?: 'small' | 'middle' | 'large';
  onSelect?: (currentPage: number, index: number) => void;
  preIcon?: JSX.Element;
  nextIcon?: JSX.Element;
  withBorderJumper?: boolean;
  className?: string;
  style?: any;
  eachDefaultStyle?: any;
  eachHoveredStyle?: any;
  eachActiveStyle?: any;
  eachDisabledStyle?: any;
  children?: JSX.Element;
}
export interface IStateTypes {
  hovered: boolean;
}
export default class DatePicker extends Component<IPropTypes, IStateTypes> {
    static defaultProps: IPropTypes;
    public state: IStateTypes;
    private genPageList;
    private quickJump;
    private handleHover;
    private handleClearHover;
    private handleChangePage;
}
