/// <reference types="react" />
import {Component} from 'react';

export interface Props {
  style?: any;
  className?: string;
  children?: JSX.Element;
}

export interface States {
}

export default class ButtonGroup extends Component<Props, States> {
    static defaultProps: Props;
    render(): JSX.Element;
}