import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MarkdownElement from 'demo/MarkdownElement';

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
        <MarkdownElement text={Readme} />
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
