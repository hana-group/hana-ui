/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (nextChecked: boolean) => void;
  auto?: boolean;
  className?: string;
}

export interface IStateTypes {
}

export default class Switch extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  private handleChange;
}
