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
  children?: React.ReactNode;
}
declare const Link: (props: IPropTypes) => React.ReactNode;
export default Link;
