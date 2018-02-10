/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 7 Feb 2018
 * Description:
 */
/// <reference types="react" />
import {Component} from 'react';

export interface IPropTypes {
  view?: 'border' | 'fill';
  content?: JSX.Element;
  position?: 'top' | 'bottom' | 'left' | 'right';
  show?: boolean;
  disabled?: boolean;
  onChange?: (show: boolean) => void;
  trigger?: 'hover' | 'focus' | 'click';
  color?: string;
  className?: string;
  style?: any;
  containerStyle?: any;
  children?: JSX.Element;
}
export interface IStateTypes {
  show: boolean;
}
export default class Tooltip extends Component<IPropTypes, IStateTypes> {
    static defaultProps: IPropTypes;
    public state: IStateTypes;
    private contentStyle;
    private nodePreRect;
    private updateContentStyle;
    private handleOpen;
    private handleClose;
    private handleOpenWithChildren;
    private handleCloseWithChildren;
}
