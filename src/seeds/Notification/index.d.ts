/// <reference types="react" />
import {Component} from 'react';

export interface Props {
  style?: any;
  type?: string[];
  content: string[] | JSX.Element[];
  duration?: number;
  showClose?: boolean;
  className?: string;
  handleClose?: () => void;
  onRequestClose?: () => void;
}

export interface States {
}

export class Notification extends Component<Props, States> {
  static defaultProps: Props;
}

export interface INotificationsProps {
  notification?: JSX.Element[];
  onRequestClose?: () => void;
}

export interface INotificationsStates {
}

export class Notifications extends Component<INotificationsProps, INotificationsStates> {
  static defaultProps: Props;
}
