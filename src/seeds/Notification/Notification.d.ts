/// <reference types="react" />
import {Component} from 'react';

export interface Props {
  style?: any;
  type?: string[];
  content: string[] || JSX.Element[];
  duration?: number;
  showClose?: boolean;
  className?: string;
  handleClose?: () => void;
  onRequestClose?: () => void;
}

export interface States {
}

export default class Notification extends Component<Props, States> {
  static defaultProps: Props;
}
