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

export class Image extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
}

export interface IGroupPropTypes {
  style?: any;
  size?: 'tiny' | 'small' | 'middle' | 'large' | 'huge';
  circular?: boolean;
  className?: string;
  children?: JSX.Element;
}

export interface IGroupStateTypes {
}

export class ImageGroup extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
}

