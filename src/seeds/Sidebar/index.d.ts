/// <reference types="react" />
import {Component} from 'react';

export interface Props {
  style?: any;
  position?: string[];
  open?: boolean;
  children?: JSX.Element
}

export interface States {
}

export default class Sidebar extends Component<Props, States> {
    static defaultProps: Props;
    render(): JSX.Element;
}