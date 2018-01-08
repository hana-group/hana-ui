/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/29
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import highlightjs from 'highlight.js';

import './markdown.css';
import './github.css';

const styles = {
  root: {
    marginTop: 20,
    marginBottom: 20,
    padding: '10px',
    background: 'rgba(255, 255, 255, .8)',
    borderRadius: 5
  }
};

export default class MarkdownElement extends Component {

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    text: ''
  };

  componentWillMount() {
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: (code, lang) =>
        highlightjs.highlight(lang, code).value
    });
  }

  render() {
    const {
      style,
      className,
      text,
      children
    } = this.props;

    /* eslint-disable react/no-danger */
    return (
      <div
        style={Object.assign({}, styles.root, style)}
        className={cx('markdown-body', className)}
      >
        <div dangerouslySetInnerHTML={{__html: marked(text)}} />
        {children}
      </div>
    );
    /* eslint-enable */
  }
}
