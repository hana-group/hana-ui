/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 4 Feb 2018
 * Description:
 */
/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  className?: string;
  style?: any;
}
export interface IStateTypes {
}
export default class Divider extends Component<IPropTypes, IStateTypes> {
    static defaultProps: IPropTypes;
    render(): JSX.Element;
}
