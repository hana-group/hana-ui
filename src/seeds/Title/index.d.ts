/// <reference types="react" />
import {Component} from 'react';

export interface Props {
  style?: any;
  subTitle?: string;
  icon?: JSX.Element;
  iconRight?: JSX.Element;
  leftIconClick?: () => void;
  children?: JSX.Element;
}

export interface States {
}

export default class Title extends Component<Props, States> {
    static defaultProps: Props;
    render(): JSX.Element;
}