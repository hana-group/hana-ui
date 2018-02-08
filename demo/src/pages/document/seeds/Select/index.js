import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import Readme from './README';
import code from '!raw-loader!hana-ui/seeds/Select/Select';
import optionCode from '!raw-loader!hana-ui/seeds/Select/Option';
import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';

import ExampleMulti from './ExampleMulti';
import ExampleMultiCode from '!raw-loader!./ExampleMulti';

import ExampleMaxHeight from './ExampleMaxHeight';
import ExampleMaxHeightCode from '!raw-loader!./ExampleMaxHeight';

import ExampleCustom from './ExampleCustom';
import ExampleCustomCode from '!raw-loader!./ExampleCustom';

export default class Demo extends Component {
  render() {
    return (
      <div>
        <MultiLangMarkdown text={Readme} />
        <ExampleContainer
          title="Base example"
          code={ExampleBaseCode}
        >
          <ExampleBase />
        </ExampleContainer>

        <ExampleContainer
          title="Multi example"
          code={ExampleMultiCode}
        >
          <ExampleMulti />
        </ExampleContainer>

        <ExampleContainer
          title="MaxHeight example"
          code={ExampleMaxHeightCode}
        >
          <ExampleMaxHeight />
        </ExampleContainer>

        <ExampleContainer
          title="Custom example"
          code={ExampleCustomCode}
        >
          <ExampleCustom />
        </ExampleContainer>

        <PropTypeDescription code={code} />
        <PropTypeDescription code={optionCode} />
      </div>
    );
  }
}
