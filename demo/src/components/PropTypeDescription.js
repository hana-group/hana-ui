/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/29
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {parse} from 'react-docgen';
import recast from 'recast';
import {parse as parseDoctrine} from 'doctrine';
import MarkdownElement from './MarkdownElement';

import './prop-type-description.css';

import {langRegexLines, langRegexLine, langManager} from '../languages';

function getDeprecatedInfo(type) {
  const deprecatedPropType = 'deprecated(PropTypes.';

  const indexStart = type.raw.indexOf(deprecatedPropType);

  if (indexStart !== -1) {
    return {
      propTypes: type.raw.substring(indexStart + deprecatedPropType.length, type.raw.indexOf(',')),
      explanation: recast.parse(type.raw).program.body[0].expression.arguments[1].value
    };
  }

  return false;
}

function generatePropType(type) {
  switch (type.name) {
    case 'func':
      return 'function';

    case 'custom': {
      const deprecatedInfo = getDeprecatedInfo(type);

      if (deprecatedInfo !== false) {
        return generatePropType({
          name: deprecatedInfo.propTypes
        });
      }

      return type.raw;
    }

    case 'enum': {
      const values = type.value.map((v) => v.value).join('<br>&nbsp;');
      return `enum:<br>&nbsp;${values}<br>`;
    }

    default:
      return type.name;
  }
}

function generateDescription(required, desc, type) {
  const lang = langManager.current;

  let description = desc;

  const langsDesc = {};
  const lines = desc.match(langRegexLines);
  if (lines) {
    lines.forEach(line => {
      const res = langRegexLine.exec(line);
      langsDesc[res[1]] = res[2];
    });
    description = langsDesc[lang] || description;
  }

  let deprecated = '';

  if (type.name === 'custom') {
    const deprecatedInfo = getDeprecatedInfo(type);

    if (deprecatedInfo) {
      deprecated = `*Deprecated*. ${deprecatedInfo.explanation}<br><br>`;
    }
  }

  const parsed = parseDoctrine(description);

  // two new lines result in a newline in the table. all other new lines
  // must be eliminated to prevent markdown mayhem.
  const jsDocText = parsed.description.replace(/\n\n/g, '<br>').replace(/\n/g, ' ');

  if (parsed.tags.some((tag) => tag.title === 'ignore')) return null;
  let signature = '';

  if (type.name === 'func' && parsed.tags.length > 0) {
    // Remove new lines from tag descriptions to avoid markdown errors.
    parsed.tags.forEach((tag) => {
      if (tag.description) {
        tag.description = tag.description.replace(/\n/g, ' ');
      }
    });

    // Split up the parsed tags into 'arguments' and 'returns' parsed objects. If there's no
    // 'returns' parsed object (i.e., one with title being 'returns'), make one of type 'void'.
    const parsedLength = parsed.tags.length;
    let parsedArgs = [];
    let parsedReturns;

    if (parsed.tags[parsedLength - 1].title === 'returns') {
      parsedArgs = parsed.tags.slice(0, parsedLength - 1);
      parsedReturns = parsed.tags[parsedLength - 1];
    } else {
      parsedArgs = parsed.tags;
      parsedReturns = {type: {name: 'void'}};
    }

    signature += '<br><br>**Signature:**<br>`function(';
    signature += parsedArgs.map((tag) => `${tag.name}: ${tag.type.name}`).join(', ');
    signature += `) => ${parsedReturns.type.name}`;
    signature += '`<br>';
    signature += parsedArgs.map((tag) => `*${tag.name}:* ${tag.description}`).join('<br>');
    if (parsedReturns.description) {
      signature += `<br> *returns* (${parsedReturns.type.name}): ${parsedReturns.description}`;
    }
  }

  return `${deprecated} ${jsDocText}${signature}`;
}

const styles = {
  footnote: {
    fontSize: '90%',
    paddingLeft: '15px'
  }
};

export default class PropTypeDescription extends Component {

  static propTypes = {
    code: PropTypes.string,
    header: PropTypes.string.isRequired
  };

  static defaultProps = {
    header: '### Properties'
  };

  render() {
    const {
      code
    } = this.props;

    const lang = langManager.getCurrent();

    let requiredProps = 0;

    let text = lang.tableHeader;

    const componentInfo = parse(code);

    Object.keys(componentInfo.props).forEach(key => {
      const prop = componentInfo.props[key];

      const description = generateDescription(prop.required, prop.description, prop.type);

      if (description === null) return;

      let defaultValue = '';

      if (prop.defaultValue) {
        defaultValue = prop.defaultValue.value.replace(/\n/g, '');
      }

      let tmp = key;
      if (prop.required) {
        tmp = `<span style="color: #31a148">${key} *</span>`;
        requiredProps += 1;
      }

      if (prop.type.name === 'custom') {
        if (getDeprecatedInfo(prop.type)) {
          tmp = `~~${key}~~`;
        }
      }

      text += `| ${tmp} | ${generatePropType(prop.type)} | ${defaultValue} | ${description} |\n`;
    });

    text += lang.tableFooter;

    let requiredPropFootnote = (requiredProps > 1) ? '* required properties' : '';
    requiredPropFootnote = (requiredProps === 1) ? '* required property' : requiredPropFootnote;

    return (
      <div className="propTypeDescription">
        <MarkdownElement text={text} style={{boxShadow: '1px 2px 1px 0 rgba(0, 0, 0, .15)'}} />
        <div style={styles.footnote}>
          {requiredPropFootnote}
        </div>
      </div>
    );
  }
}
