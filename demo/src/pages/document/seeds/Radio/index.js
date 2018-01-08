import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MarkdownElement from 'demo/MarkdownElement';

import ReadmeText from './README';
import code from '!raw-loader!hana-ui/seeds/Radio/Radio';
import groupCode from '!raw-loader!hana-ui/seeds/Radio/RadioGroup';

import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';

import ExampleDisabled from './ExampleDisabled';
import ExampleDisabledCode from '!raw-loader!./ExampleDisabled';

import ExampleGroup from './ExampleGroup';
import ExampleGroupCode from '!raw-loader!./ExampleGroup';

import ExampleCustom from './ExampleCustom';
import ExampleCustomCode from '!raw-loader!./ExampleCustom';

export default class Checkbox extends Component {
  render() {
    return (
      <div>
        <MarkdownElement text={ReadmeText} />

        <ExampleContainer
          title="Base example"
          code={ExampleBaseCode}
        >
          <ExampleBase />
        </ExampleContainer>

        <ExampleContainer
          title="Disabled example"
          code={ExampleDisabledCode}
        >
          <ExampleDisabled />
        </ExampleContainer>

        <ExampleContainer
          title="Group example"
          code={ExampleGroupCode}
        >
          <ExampleGroup />
        </ExampleContainer>

        <ExampleContainer
          title="Custom example"
          code={ExampleCustomCode}
        >
          <ExampleCustom />
        </ExampleContainer>

        <PropTypeDescription code={code} header="### Radio Properties" />
        <PropTypeDescription code={groupCode} header="### RadioGroup Properties" />
      </div>
    );
  }
}
