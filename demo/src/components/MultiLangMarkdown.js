/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/6
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MarkdownElement from './MarkdownElement';

import {langRegexLines, langRegexLine, langManager} from '../languages';

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

  parseText = t => {
    let text = t;

    const lang = langManager.current;
    const langsText = {};

    const lines = text.match(langRegexLines);
    if (lines) {
      lines.forEach(line => {
        const res = langRegexLine.exec(line);
        langsText[res[1]] = res[2];
      });
      text = langsText[lang] || text;
    }

    this.setState({text});
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
