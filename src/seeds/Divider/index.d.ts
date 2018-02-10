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

declare const Divider: (props: IPropTypes) => React.ReactNode;
export default Divider;
