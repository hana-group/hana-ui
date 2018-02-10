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
  descStyle: any,
  icon: JSX.Element,
  color: string
};

declare type TValue = string | number;

export interface IPropTypes {
  auto?: boolean;
  autoSize?: {
    minLines: number;
    maxLines: number;
  };
  disabled?: boolean;
  defaultValue?: TValue;
  value?: TValue;
  size?: 'small' | 'middle' | 'large';
  height?: number | string;
  backgroundColor?: string,
  withIcon?: boolean;
  icon?: JSX.Element;
  color?: string;
  message?: string;
  iconPosition?: 'before' | 'after';
  focus?: boolean;
  onChange?: (event: Event, value: TValue) => void;
  onBlur?: (event: Event, value: TValue) => void;
  onFocus?: (event: Event, value: TValue) => void;
  className?: string;
  style?: any;
  inputStyle?: any;
  descStyle?: any;
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
export default class TextArea extends Component<IPropTypes, IStateTypes> {
    static defaultProps: IPropTypes;
    public state: IStateTypes;
    public focus: () => void;
    public blur: () => void;
    private refInput;
    private updateStyles;
    private calcHintAttrs;
    private handlePressKey;
    private handleChange;
    private handleBlur;
    private handleFocus;
}
