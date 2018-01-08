import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MarkdownElement from 'demo/MarkdownElement';

import ReadmeText from './README';
import checkboxCode from '!raw-loader!hana-ui/seeds/Checkbox/Checkbox';
import checkboxGroupCode from '!raw-loader!hana-ui/seeds/Checkbox/CheckboxGroup';
import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';

import ExampleAuto from './ExampleAuto';
import ExampleAutoCode from '!raw-loader!./ExampleAuto';

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

        <PropTypeDescription code={checkboxCode} header="### Checkbox Properties" />
        <PropTypeDescription code={checkboxGroupCode} header="### CheckboxGroup Properties" />
      </div>
    );
  }
}
