/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/20
 */
import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import readmeText from './README';
import code from '!raw-loader!hana-ui/seeds/Popover/Popover';
import ExampleBase from './ExampleBase';
import txampleBaseCode from '!raw-loader!./ExampleBase';

export default class Popover extends Component {
  render() {
    return (
      <div>
        <MultiLangMarkdown text={readmeText} />
        <ExampleContainer
          title="Base examples"
          code={txampleBaseCode}
        >
          <ExampleBase />
        </ExampleContainer>
        <PropTypeDescription code={code} />
      </div>
    );
  }
}
