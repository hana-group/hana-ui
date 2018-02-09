/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  children?: JSX.Element;
  color?: string;
  style?: any;
  hasClose?: boolean;
  onClose?: (event: Event, children: JSX.Element) => void;
  onClick?: (event: Event, children: JSX.Element) => void;
  size?: 'small' | 'middle' | 'large';
  className?: string;
}

export interface IStateTypes {
}

export default class Tag extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  private handleClick;
}
