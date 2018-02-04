/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/29
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {parse} from 'react-docgen';
import CodeView from './CodeView';
import cx from 'classnames';

import {langRegexLines, langRegexLineWithHeader, langManager} from '../../languages';

import './bass.scss';

export default class ExampleContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    code: PropTypes.string.isRequired,
    component: PropTypes.bool,
    description: PropTypes.string,
    title: PropTypes.string
  };

  static defaultProps = {
    component: true
  };

  parseDescription = () => {
    const {
      component,
      code,
      description,
      title
    } = this.props;

    const lang = langManager.current;

    const docs = component ? parse(code) : null;

    let resDesc = description || docs.description;
    let resTitle = title;

    const langsDesc = {};
    if (docs) {
      const lines = docs.description.match(langRegexLines);
      if (lines) {
        lines.forEach(line => {
          const tmp = langRegexLineWithHeader.exec(line);
          langsDesc[tmp[1]] = {title: tmp[2], description: tmp[3]};
        });
        resDesc = langsDesc[lang] ? langsDesc[lang].description : resDesc;
        resTitle = langsDesc[lang] ? langsDesc[lang].title : resTitle;
      }
    }

    return {title: resTitle, description: resDesc};
  };

  render() {
    const {
      children,
      code
    } = this.props;

    const {title, description} = this.parseDescription();

    return (
      <div className={cx('example-container')}>
        <CodeView
          title={title}
          description={description}
        >
          {code}
        </CodeView>
        <div className={cx('example-content')}>
          {children}
        </div>
      </div>
    );
  }
}
