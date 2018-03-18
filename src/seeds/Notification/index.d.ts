/// <reference types="react" />
import {Component} from 'react';

export interface Props {
  style?: any;
  type?: 'info' | 'success' | 'error' | 'warning';
  content?: React.ReactNode;
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
  notification?: Props;
  onRequestClose?: () => void;
}

export interface INotificationsStates {
}

export class Notifications extends Component<INotificationsProps, INotificationsStates> {
  static defaultProps: Props;
}
