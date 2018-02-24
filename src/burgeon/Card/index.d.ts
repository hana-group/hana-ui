/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  titleStyle?: any;
  containerStyle?: any;
  icon?: React.ReactNode;
  expand?: boolean;
  expandIcon?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  className?: string;
  style?: any;
  onClick?: (event: Event) => void;
}

export interface IStateTypes {
  open: boolean;
}

export default class Card extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  private handleExpand;
  private handleClick;
}
