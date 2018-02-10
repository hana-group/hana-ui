/// <reference types="react" />
import {Component} from 'react';

export interface Props {
  notification?: JSX.Element[];
  onRequestClose?: () => void;
}

export interface States {
}

export default class Notifications extends Component<Props, States> {
  static defaultProps: Props;
}
