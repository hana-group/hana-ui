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
  icon: PropTypes.node,
  color: PropTypes.string
};

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
  onChange: (event: Event, value: valueType) => void;
  onBlur: (event: Event, value: valueType) => void;
  onFocus: (event: Event, value: valueType) => void;
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
    private updateStyles;
    private calcHintAttrs;
    private handlePressKey;
    private handleChange;
    private handleBlur;
    private handleFocus;
    public render: () => JSX.Element;
}
