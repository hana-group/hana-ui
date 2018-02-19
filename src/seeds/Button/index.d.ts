/// <reference types="react" />
import {Component} from 'react';

export interface Props {
  size?: 'large' | 'middle' | 'small';
  type?: 'primary' | 'error' | 'default' | 'disabled' | 'warning';
  htmlType?: string;
  label?: string;
  labelPosition?: 'left' | 'right';
  icon?: string;
  iconColor?: string;
  iconStyle?: any;
  iconSize?: string;
  className?: string;
  style?: any;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface States {
}

export class Button extends Component<Props, States> {
    static defaultProps: Props;
}

export interface GroupProps {
  style?: any;
  className?: string;
  children?: React.ReactNode;
}

export interface GroupStates {
}

export class ButtonGroup extends Component<GroupProps, GroupStates> {
    static defaultProps: Props;
}
