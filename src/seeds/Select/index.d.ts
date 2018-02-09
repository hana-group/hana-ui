/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  auto?: boolean;
  value: any;
  disabled?: boolean;
  onChange?: (value: any) => void;
  onSelect?: (value: any) => void;
  children?: JSX.Element;
  defaultLabel?: string;
  multiple?: boolean;
  maxHeight?: number;
  orientation?: 'down' | 'up';
  autoUpdown?: boolean;
  selectionStyle?: any;
  optionWrapStyle?: any;
  arrowIcon?: JSX.Element;
  size?: 'small' | 'middle' | 'large';
  name?: string;
  className?: string;
}

export interface IStateTypes {
  open: boolean;
  value: any;
  orientation: 'down' | 'up';
}

export class Select extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  private handleCloseOutside;
  private hasEnoughHeight;
  private handleToggle;
  private handleSelect;
  private singleSelect;
  private multiSelect;
  private updateMultipleWrapStyle;
  private renderSingleLabel;
  private renderMultiLabel;
  private renderOptions;
}

export interface IOptionPropTypes {
  label: string | number;
  disabled?: boolean;
  selected?: boolean;
  value: any;
  onClick?: (value: any, label: string | number, selected: boolean) => void;
  className?: string;
}

export interface IOptionStateTypes {

}

export class Option extends Component<IOptionPropTypes, IOptionStateTypes> {
  static defaultProps: IOptionPropTypes;
  private handleClick;
}