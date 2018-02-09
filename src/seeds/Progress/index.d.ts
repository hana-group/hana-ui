/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  value?: number;
  color?: string;
  fontColor?: string;
  size?: 'small' | 'middle' | 'large';
  min?: number;
  max?: number;
}

export interface IStateTypes {
}

export default class Progress extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  static formatValue;
}
