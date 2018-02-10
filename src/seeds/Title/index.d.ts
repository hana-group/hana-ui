/// <reference types="react" />
import {Component} from 'react';

export interface Props {
  style?: any;
  subTitle?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  leftIconClick?: () => void;
  children?: React.ReactNode;
}

export interface States {
}

export default class Title extends Component<Props, States> {
    static defaultProps: Props;
}