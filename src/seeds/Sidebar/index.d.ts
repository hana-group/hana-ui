/// <reference types="react" />
import {Component} from 'react';

export interface Props {
  style?: any;
  className?: string;
  position?: string[];
  open?: boolean;
  children?: React.ReactNode
}

export interface States {
}

export default class Sidebar extends Component<Props, States> {
    static defaultProps: Props;
}