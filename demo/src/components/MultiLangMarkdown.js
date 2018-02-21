/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/6
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MarkdownElement from './MarkdownElement';

import {langRegexLines, langRegexLine, langManager, parseText} from '../languages';

export default class MultiLangMarkdown extends Component {

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    text: ''
  };

  state = {
    text: ''
  };

  componentWillMount() {
    const {
      text
    } = this.props;

    this.parseText(text);
  }

  componentWillReceiveProps(nextProps) {
    const {
      text
    } = nextProps;

    this.parseText(text);
  }

  parseText = text => {
    this.setState({text: parseText(text)[langManager.current]});
  };

  render() {
    const {
      style,
      className,
      children
    } = this.props;

    const {
      text
    } = this.state;

    return (
      <MarkdownElement
        text={text}
        style={style}
        className={className}
      >
        {children}
      </MarkdownElement>
    );
  }
}
