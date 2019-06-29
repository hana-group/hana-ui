/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  style?: any;
  children?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  titleStyle?: any;
  subtitleStyle?: any;
  className?: string;
}

export interface IStateTypes {
}

export class Postcard extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
}

export interface IPostcardGroupPropTypes {
  children: React.ReactNode;
  height?: number;
  mode?: 'normal' | 'random' | 'clothesline';
  className?: string;
  style?: any;
}

export interface IPostcardGroupStateTypes {
}

export class PostcardGroup extends Component<IPostcardGroupPropTypes, IPostcardGroupStateTypes> {
  static defaultProps: IPostcardGroupPropTypes;
  private renderPostcards;
}