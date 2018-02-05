import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import Readme from './README';
import code from '!raw-loader!hana-ui/seeds/Switch/Switch';
import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';

import ExampleAuto from './ExampleAuto';
import ExampleAutoCode from '!raw-loader!./ExampleAuto';

import ExampleDisabled from './ExampleDisabled';
import ExampleDisabledCode from '!raw-loader!./ExampleDisabled';

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
          title="Auto example"
          code={ExampleAutoCode}
        >
          <ExampleAuto />
        </ExampleContainer>

        <ExampleContainer
          title="Disabled example"
          code={ExampleDisabledCode}
        >
          <ExampleDisabled />
        </ExampleContainer>
        <PropTypeDescription code={code} />
      </div>
    );
  }
}
