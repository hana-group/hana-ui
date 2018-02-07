/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 7 Feb 2018
 * Description:
 */
/// <reference types="react" />
export interface IPropTypes {
  className?: string;
  style?: any;
  href: string;
  icon?: string;
  size?: 'small' | 'middle' | 'large';
  children?: JSX.Element;
}
declare const Link: (props: IPropTypes) => JSX.Element;
export default Link;
