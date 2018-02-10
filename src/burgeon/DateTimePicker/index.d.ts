/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 5 Feb 2018
 * Description:
 */
/// <reference types="react" />
import {Component} from 'react';
import {
  arrayWith7Strings, arrayWith12Strings, dateOrStringOrNull
} from '../../utils';

export interface IPropTypes {
  value: dateOrStringOrNull;
  onChange?: (date: Date, text: string) => void;
  onCancel?: () => void;
  lang?: 'en' | 'cn' | 'jp';
  dateViewProps?: {[key: string]: any};
  timeViewProps?: {[key: string]: any};
  dateShow?: boolean;
  timeShow?: boolean;
  withClear?: boolean;
  autoOk?: boolean;
  dateFormat?: (date: Date) => string;
  timeFormat?: (time: Date) => string;
  className?: string;
  dateClassName?: string;
  timeClassName?: string;
  dateDialogClassName?: string;
  timeDialogClassName?: string;
  style?: any;
  dateStyle?: any;
  timeStyle?: any;
  dialogStyle?: any;
  dateDialogStyle?: any;
  timeDialogStyle?: any;
  weekdayNames?: arrayWith7Strings;
  weekdayShortNames?: arrayWith7Strings;
  monthNames?: arrayWith12Strings;
  actionNames?: {
    ok: string,
    cancel: string
  };
  yearStart?: number;
  yearEnd?: number;
}
export interface IStateTypes {
  show: boolean;
  date: Date;
  innerDate: Date;
}
export default class DateTimePicker extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  public state: IStateTypes;
  private format;
  private setDate;
  private setTime;
}
