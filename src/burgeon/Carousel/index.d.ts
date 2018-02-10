/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  style?: any;
  currentIndex?: number;
  children: React.ReactNode;
  className?: string;
  height?: number;
  width?: number;
  mode?: 'fade' | 'slide';
  vertical?: boolean;
  transitionTime?: number;
  onChange?: (index: number) => void;
  autoplay?: boolean;
  autoplayTime?: number;
}

export interface IStateTypes {
  currentIndex: number;
}

export default class Carousel extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  private autoplay;
  private movePrev;
  private moveNext;
  private moveTo;
  private slideStart;
  private slideEnd;
  private calcIndex;
}
