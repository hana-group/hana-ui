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
  view?: 'base' | 'box';
  url: string;
  auto?: boolean;
  multiple?: boolean,
  type?: string;
  disabled?: boolean;
  parseFileObj?: (file: File) => {[key: string]: any};
  filterFileObj?: (file: File) => boolean;
  data?: {[key: string]: any};
  headers?: {[key: string]: any};
  onChoose?: (fileObj: {[key: string]: any}) => void;
  onStart?: (fileObj: {[key: string]: any}) => void;
  onProgress?: (event: ProgressEvent, fileObj: {[key: string]: any}) => void;
  onSuccess?: (response: Response, fileObj: {[key: string]: any}) => void;
  onError?: (error: Error, response: Response, fileObj: {[key: string]: any}) => void;
  withCredentials?: boolean;
  renderContent?: (files: {[key: string]: any}[]) => JSX.Element;
}
export interface IStateTypes {
}
export default class Upload extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes;
}

export interface IBasePropTypes {
  url: string;
  auto?: boolean;
  multiple?: boolean,
  type?: string;
  parseFileObj?: (file: File) => {[key: string]: any};
  filterFileObj?: (file: File) => boolean;
  data?: {[key: string]: any};
  headers?: {[key: string]: any};
  onChoose?: (fileObj: {[key: string]: any}) => void;
  onStart?: (fileObj: {[key: string]: any}) => void;
  onProgress?: (event: ProgressEvent, fileObj: {[key: string]: any}) => void;
  onSuccess?: (response: Response, fileObj: {[key: string]: any}) => void;
  onError?: (error: Error, response: Response, fileObj: {[key: string]: any}) => void;
  withCredentials?: boolean;
  renderContent?: (files: {[key: string]: any}[]) => JSX.Element;
}
export interface IBaseStateTypes {
}
export class UploadBase extends Component<IBasePropTypes, IBaseStateTypes> {
  static defaultProps: IPropTypes;
  private refInput;
  private files;
  private validFiles;
  private uploadFiles;
  private abortFiles;
  private deleteFiles;
  private parseFile;
  private swapFiles;
  private filesToList;
  private triggerChoose;
  private handleClick;
  private handleChoose;
  private handleConfirm;
  private handleProgress;
  private handleError;
  private handleSuccess;
  public renderContent: () => JSX.Element;
}
