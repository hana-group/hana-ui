/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  children: JSX.Element;
  onSubmit?: (event: Event) => void;
  labelPosition?: 'top' | 'left';
  className?: string;
}

export interface IStateTypes {
  
}

export class Form extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
}

export interface IFormItemPropTypes {
  children: JSX.Element;
  label: JSX.Element;
  info: JSX.Element;
  status?: 'normal' | 'success' | 'error' | 'warn';
  labelPosition?: 'top' | 'left';
  style?: any;
  elementStyle?: any;
  className?: string;
}

export interface IFormItemStateTypes {
  
}

export class FormItem extends Component<IFormItemPropTypes, IFormItemStateTypes> {
  static defaultProps: IFormItemPropTypes;
}

export interface IFormGroupPropTypes {
  children: JSX.Element;
  label: JSX.Element;
  labelPosition?: 'top' | 'left';
  className?: string;
  labelStyle?: any;
  elementStyle?: any;
  style?: any;
}

export interface IFormGroupStateTypes {
  
}

export class FormGroup extends Component<IFormGroupPropTypes, IFormGroupStateTypes> {
  static defaultProps: IFormGroupPropTypes;
}