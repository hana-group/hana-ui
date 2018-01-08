/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/29
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {parse} from 'react-docgen';
import CodeView from './CodeView';

import {langRegexLines, langRegexLineWithHeader, langManager} from '../../languages';

export default class ExampleContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    code: PropTypes.string.isRequired,
    component: PropTypes.bool,
    description: PropTypes.string,
    exampleBlockStyle: PropTypes.object,
    layoutSideBySide: PropTypes.bool,
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
      code,
      exampleBlockStyle,
      layoutSideBySide
    } = this.props;

    const styles = {
      root: {
        backgroundColor: 'rgba(255, 255, 255, .8)',
        border: '1px solid #ddd',
        borderRadius: 5,
        marginBottom: 32,
        boxShadow: '1px 2px 1px 0 rgba(0, 0, 0, .15)'
      },
      exampleBlock: {
        borderRadius: '0 0 2px 0',
        padding: '14px 24px 24px',
        margin: 0,
        width: layoutSideBySide ? '45%' : null,
        float: layoutSideBySide ? 'right' : null
      }
    };

    const {title, description} = this.parseDescription();

    return (
      <div style={styles.root}>
        <CodeView
          title={title}
          description={description}
        >
          {code}
        </CodeView>
        <div style={Object.assign(styles.exampleBlock, exampleBlockStyle)}>{children}</div>
      </div>
    );
  }
}
