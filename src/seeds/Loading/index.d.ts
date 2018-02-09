/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  content?: JSX.Element;
  icon?: JSX.Element;
  rotate?: boolean;
  wrapStyle?: any;
  style?: any;
  contentStyle?: any;
  className?: string;
}

export interface IStateTypes {
}

export default class Loading extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
}
