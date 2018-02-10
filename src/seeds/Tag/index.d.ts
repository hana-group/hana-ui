/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  children?: React.ReactNode;
  color?: string;
  style?: any;
  hasClose?: boolean;
  onClose?: (event: Event, children: React.ReactNode) => void;
  onClick?: (event: Event, children: React.ReactNode) => void;
  size?: 'small' | 'middle' | 'large';
  className?: string;
}

export interface IStateTypes {
}

export default class Tag extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  private handleClick;
}
