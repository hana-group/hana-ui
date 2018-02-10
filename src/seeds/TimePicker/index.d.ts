/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 5 Feb 2018
 * Description:
 */
/// <reference types="react" />
import {Component} from 'react';
import {dateOrStringOrNull} from '../../utils';

export interface IPropTypes {
  time: dateOrStringOrNull;
  onChange?: (time: Date, text: string) => void;
  onCancel?: () => void;
  lang?: 'en' | 'cn' | 'jp';
  view?: 'text';
  viewProps?: {[key: string]: any};
  show?: boolean;
  withClear?: boolean;
  autoOk?: boolean;
  format?: (time: Date) => string;
  className?: string;
  dialogClassName?: string;
  style?: any;
  dialogStyle?: any;
  actionNames?: {
    ok: string,
    cancel: string
  };
  children?: JSX.Element;
}
export interface IStateTypes {
  show: boolean;
  time: Date;
  innerTime: Date;
}
export default class TimePicker extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  public state: IStateTypes;
  private refView;
  private refCalender;
  private position;
  private initArray;
  private positionIncubator;
  private addTime;
  private handleScroll;
  private handlePressKey;
  private handleOpenDialog;
  private handleCloseDialog;
  private getWithLang;
  private changeTime;
  private handleChangeHour;
  private handleChangeMinute;
  private handleChangeSecond;
  private handleConfirm;
  private handleCancel;
  private handleClear;
}
