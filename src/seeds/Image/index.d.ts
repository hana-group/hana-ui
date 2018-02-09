/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  src: string;
  alt?: string;
  style?: any;
  size?: 'tiny' | 'small' | 'middle' | 'large' | 'huge';
  circular?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export interface IStateTypes {
}

export default class Image extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
}
