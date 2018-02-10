/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 7 Feb 2018
 * Description:
 */
/// <reference types="react" />
import {Component} from 'react';

export interface IPropTypes {
  view?: 'window' | 'full';
  mode?: 'random' | 'cycle' | 'repeat' | 'normal';
  preload?: string;
  autoPlay?: boolean;
  play?: boolean;
  currentTime?: number;
  volume?: number;
  list?: {
    title: string,
    desc?: string,
    sources: {
      src: string,
      type?: string
    }[],
    image?: string,
    text?: string,
    poster?: string
  }[];
  currentItem?: number;
  defaultText?: string;
  defaultImage?: string;
  defaultImage?: string;
  className?: string;
  style?: any;
  children?: JSX.Element;
}
export interface IStateTypes {
  view: 'window', 'full';
  mode: 'random', 'cycle', 'repeat', 'normal';
  play: boolean;
  currentTime: number;
  currentPercent: number;
  volume: number;
  currentItem: number;
  bufferedPercent: number;
  openList: boolean;
  showControllers: boolean;
}
export default class VideoPlayer extends Component<IPropTypes, IStateTypes> {
    static defaultProps: IPropTypes;
    public state: IStateTypes;
    private refVideo;
    private refRoot;
    private timeoutId;
    private mouseTimeoutId;
    private durationStr;
    private currentStr;
    private list;
    private parseProps;
    private parseSources;
    private genType;
    private smartFormatTime;
    private play;
    private pause;
    private handleProgress;
    private handleTimeUpdate;
    private handlePlayEnd;
    private handlePressKey;
    private handleSwitchPlay;
    private handleSwitchVolume;
    private handleChangeVolume;
    private handleChangeCurrent;
    private handleSwitchMode;
    private handleSwitchView;
    private handleViewChange;
    private handleSwitchList;
    private handleChangeItem;
    private handleMouseMove;
    public render: () => JSX.Element;
    private renderVideo;
    private renderControllers;
    private renderProgress;
    private renderList;
    private renderListItem;
}
