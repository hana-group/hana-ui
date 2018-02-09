/// <reference types="react" />
import {Component} from 'react';
export interface IPropTypes {
  style?: any;
  children?: JSX.Element;
  title?: JSX.Element;
  subtitle?: JSX.Element;
  titleStyle?: any;
  subtitleStyle?: any;
}

export interface IStateTypes {
}

export class Postcard extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
}

export interface IPostcardGroupPropTypes {
  children: JSX.Element;
  height?: number;
  mode?: 'normal' | 'random' | 'clothesline';
}

export interface IPostcardGroupStateTypes {
}

export class PostcardGroup extends Component<IPostcardGroupPropTypes, IPostcardGroupStateTypes> {
  static defaultProps: IPostcardGroupPropTypes;
  private renderPostcards;
}