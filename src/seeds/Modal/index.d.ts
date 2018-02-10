/// <reference types="react" />
import {Component} from 'react';

export interface Props {
  style?: any;
  wrapperStyle?: any;
  contentStyle?: any;
  title?: string;
  titleStyle?: any;
  show: boolean;
  showClose?: boolean;
  close?: React.ReactNode;
  confirm?: () => void;
  cancel?: () => void;
  actions?: React.ReactNode;
  id?: string;
  children?: React.ReactNode;
}

export interface States {
}

export default class Modal extends Component<Props, States> {
    static defaultProps: Props;
    render(): React.ReactNode;
}