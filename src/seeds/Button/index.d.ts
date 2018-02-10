/// <reference types="react" />
import {Component} from 'react';

export interface Props {
  size?: string[];
  type?: string[];
  htmlType?: string;
  label?: string;
  labelPosition?: string[];
  icon?: string;
  iconColor?: string;
  iconStyle?: any;
  iconSize?: string;
  className?: string;
  style?: any;
  onClick?: () => void;
  children?: JSX.Element;
}

export interface States {
}

export class Button extends Component<Props, States> {
    static defaultProps: Props;
}

export interface GroupProps {
  style?: any;
  className?: string;
  children?: JSX.Element;
}

export interface GroupStates {
}

export class ButtonGroup extends Component<GroupProps, GroupStates> {
    static defaultProps: Props;
}
