/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  defaultValue: number;
  value: number;
  color: string;
  onChange: (value: number) => void;
  onDragStart: (event: Event) => void;
  onDragEnd: (event: Event) => void;
  min: number;
  max: number;
  className: string;
}

export interface IStateTypes {
}

export default class Slider extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  private getWidth;
  private dragStart;
  private handleMouseMove;
  private handleMouseUp;
}
