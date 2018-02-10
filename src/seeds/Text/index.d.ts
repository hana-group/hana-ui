/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 7 Feb 2018
 * Description:
 */
/// <reference types="react" />
import {Component} from 'react';

declare type THint = {
  show: boolean,
  message: string,
  style: any,
  icon: JSX.Element
};

declare type TValue = string | number;

export interface IPropTypes {
  auto?: boolean;
  mode?: 'text' | 'password';
  type?: 'string' | 'int' | 'float';
  view?: 'box' | 'underline';
  disabled?: boolean;
  defaultValue?: TValue;
  value?: TValue;
  size?: 'small' | 'middle' | 'large';
  withIcon?: boolean;
  icon?: JSX.Element;
  color?: string;
  message?: string;
  iconPosition?: 'before' | 'after';
  focus?: boolean;
  onChange: (event: Event, value: valueType) => void;
  onSubmit: (event: Event, value: valueType) => void;
  onBlur: (event: Event, value: valueType) => void;
  onFocus: (event: Event, value: valueType) => void;
  className?: string;
  style?: any;
  inputStyle?: any;
  active?: THint;
  error?: THint;
  warning?: THint;
  success?: THint;
  children?: JSX.Element;
}
export interface IStateTypes {
  value: TValue;
  focus: boolean;
}
export default class Text extends Component<IPropTypes, IStateTypes> {
    static defaultProps: IPropTypes;
    public state: IStateTypes;
    public focus: () => void;
    public blur: () => void;
    private refInput;
    private calcHintAttrs;
    private handlePressKey;
    private handleChange;
    private handleBlur;
    private handleFocus;
    private handleSubmit;
    public render: () => JSX.Element;
}
