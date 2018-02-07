/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  children: JSX.Element;
  title: string;
  subtitle: string;
  titleStyle: any;
  containerStyle: any;
  icon: JSX.Element;
  expand: boolean;
  expandIcon: JSX.Element;
  open: boolean;
  defaultOpen: boolean;
  className: string;
  onClick: (event: Event) => void;
}

export interface IStateTypes {
  open: boolean;
}

export default class Card extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  private handleExpand;
  private handleClick;
}
