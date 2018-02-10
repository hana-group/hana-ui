/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  type: string;
  color?: string;
  style?: any;
  size?: 'small' | 'middle' | 'large';
  iconStyle?: any;
  tipContent?: React.ReactNode;
  tipStyle?: any;
  tipColor?: string;
  tipPosition?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
  onClick?: (event: Event) => void;
}

export interface IStateTypes {
}

export default class IconButton extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
}
