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
  close?: JSX.Element;
  confirm?: () => void;
  cancel?: () => void;
  actions?: JSX.Element;
  id?: string;
  children?: JSX.Element;
}

export interface States {
}

export default class Modal extends Component<Props, States> {
    static defaultProps: Props;
    render(): JSX.Element;
}