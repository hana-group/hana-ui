/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  type: string;
  color?: string;
  style?: any;
  size?: 'small' | 'middle' | 'large';
  className?: string;
}

export interface IStateTypes {
}

export default class Icon extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
}
