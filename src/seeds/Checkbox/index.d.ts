/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  value: any;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange: (event: Event, isChecked: boolean) => void;
  auto?: boolean;
  style?: any;
  label: React.ReactNode;
  checkedIcon?: React.ReactNode;
  unCheckedIcon?: React.ReactNode;
  className?: string;
}

export interface IStateTypes {
  checked: boolean;
}

export class Checkbox extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  private handleClick;
  private handleChange;
}

export interface IGroupPropTypes {
  children: React.ReactNode;
  value: Array<any>;
  onChange?: (event: Event, nextChecked: boolean, itemValue: any) => void;
  disabled?: boolean;
  checkedIcon?: React.ReactNode;
  unCheckedIcon?: React.ReactNode;
  className?: string;
}

export interface IGroupStateTypes {

}

export class CheckboxGroup extends Component<IGroupPropTypes, IGroupStateTypes> {
  static defaultProps: IGroupPropTypes;
  private handleChange;
}