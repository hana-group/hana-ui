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
  date: dateOrStringOrNull;
  onChange?: (date: Date, text: string) => void;
  onCancel?: () => void;
  lang?: 'en' | 'cn' | 'jp';
  view?: 'text';
  viewProps?: {[key: string]: any};
  show?: boolean;
  withClear?: boolean;
  autoOk?: boolean;
  format?: (date: Date) => string;
  className?: string;
  dialogClassName?: string;
  style?: any;
  dialogStyle?: any;
  weekdayNames?: arrayWith7Strings;
  weekdayShortNames?: arrayWith7Strings;
  monthNames?: arrayWith12Strings;
  actionNames?: {
    ok: string,
    cancel: string
  };
  yearStart?: number;
  yearEnd?: number;
  children?: React.ReactNode;
}
export interface IStateTypes {
  show: boolean;
  date: Date;
  innerDate: Date;
}
export default class DatePicker extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
  public state: IStateTypes;
  private refView;
  private refCalender;
  private position;
  private preDate;
  private positionIncubator;
  private addDate;
  private handleScroll;
  private handlePressKey;
  private handleOpenDialog;
  private handleCloseDialog;
  private getWithLang;
  private handleChangeDate;
  private handleConfirm;
  private handleCancel;
  private handleClear;
}
