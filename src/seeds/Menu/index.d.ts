/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  value?: any;
  style?: any;
  children?: JSX.Element;
  onClick?: (event: Event, value: any) => void;
  auto?: boolean;
  disabled?: boolean;
  horizonal?: boolean;
  type?: 'default' | 'linear';
  className?: string;
}

export interface IStateTypes {
  
}

export class Menu extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  private handleClick;
}

export interface IMenuItemPropTypes {
  active?: boolean;
  disabled?: boolean;
  style?: any;
  children?: JSX.Element;
  onClick?: (event: Event, value: any) => void;
  value?: any;
  icon?: string;
  className?: string;
}

export interface IMenuItemStateTypes {
  
}

export class MenuItem extends Component<IMenuItemPropTypes, IMenuItemStateTypes> {
  static defaultProps: IMenuItemPropTypes;
  private handleClick;
}

export interface ISubMenuPropTypes {
  title?: string;
  active?: boolean;
  style?: any;
  children?: JSX.Element;
  onClick?: (event: Event, value: any) => void;
  disabled?: boolean;
  icon?: string;
  className?: string;
}

export interface ISubMenuStateTypes {
  active: boolean;
}

export class SubMenu extends Component<ISubMenuPropTypes, ISubMenuStateTypes> {
  static defaultProps: ISubMenuPropTypes;
  private handleToggle;
}