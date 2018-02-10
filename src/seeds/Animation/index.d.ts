/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  children: (...any) => React.ReactNode;
  duration?: number;
  animation: any;
  onStart?: (animation: any, props: IPropTypes) => void;
  onEnd?: (animation: any, props: IPropTypes) => void;
  easing?: 'easeCubicInOut' | 'easeLinear' | 'easePolyInOut' | 'easeQuadInOut' | 'easeSinInOut' | 'easeExpInOut' | 'easeCircleInOut'
}

export interface IStateTypes {
  value: any;
}

export default class Animation extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  private update;
  private getCurrentTime;
  private startTimer;
}
