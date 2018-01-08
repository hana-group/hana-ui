/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/6
 */
import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import readmeText from './README';
import fileObjText from './FileObj.md';
import code from '!raw-loader!hana-ui/burgeon/Upload/Upload';
import ExampleBase from './ExampleBase';
import exampleBaseCode from '!raw-loader!./ExampleBase';
import ExampleMethods from './ExampleMethods';
import exampleMethodCode from '!raw-loader!./ExampleMethods';
import ExampleCustom from './ExampleCustom';
import exampleCustomCode from '!raw-loader!./ExampleCustom';

export default class Card extends Component {
  render() {
    return (
      <div>
        <MultiLangMarkdown text={readmeText} />
        <ExampleContainer
          code={exampleBaseCode}
        >
          <ExampleBase />
        </ExampleContainer>
        <ExampleContainer
          code={exampleMethodCode}
        >
          <ExampleMethods />
        </ExampleContainer>
        <ExampleContainer
          code={exampleCustomCode}
        >
          <ExampleCustom />
        </ExampleContainer>
        <PropTypeDescription code={code} />
        <MultiLangMarkdown text={fileObjText} />
      </div>
    );
  }
}
