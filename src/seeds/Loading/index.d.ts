/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  mode?: 'rotate' | 'queue' | 'image';
  content?: React.ReactNode;
  icon?: React.ReactNode;
  icons?: [React.ReactNode, React.ReactNode, React.ReactNode, React.ReactNode];
  image?: string;
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
