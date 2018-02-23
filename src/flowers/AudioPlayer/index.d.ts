/// <reference types="react" />
import {Component} from 'react';
interface IListItem {
  poster: string;
  src: string;
  title: string;
  artist: string;
}

export interface IPropTypes {
  list?: Array<IListItem>;
  autoPlay?: boolean;
  mode?: 'random' | 'repeat' | 'normal';
  volume?: number;
  currentIndex?: number;
  currentTime?: number;
  defaultPoster?: string;
}

export interface IStateTypes {
  play: boolean;
  current: IListItem;
  currentIndex :number;
  currentTime :number;
  duration: number;
  volume: number;
  showList: boolean;
  mode: 'random' | 'repeat' | 'normal';
}

export default class IconButton extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  private refAudio;
  private handlePlay;
  private handlePause;
  private togglePlay;
  private handleSwitch;
  private handleSwitchTime;
  private handleSwitchVolume;
  private handlePrev;
  private handleNext;
  private handleSetMode;
}
