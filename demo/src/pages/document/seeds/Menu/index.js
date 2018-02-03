import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import ReadmeText from './README';
import menuCode from '!raw-loader!hana-ui/seeds/Menu/Menu';
import subMenuCode from '!raw-loader!hana-ui/seeds/Menu/SubMenu';
import menuItemCode from '!raw-loader!hana-ui/seeds/Menu/MenuItem';
import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';

import ExampleNested from './ExampleNested';
import ExampleNestedCode from '!raw-loader!./ExampleNested';

import ExampleDisabled from './ExampleDisabled';
import ExampleDisabledCode from '!raw-loader!./ExampleDisabled';

import ExampleTab from './ExampleTab';
import ExampleTabCode from '!raw-loader!./ExampleTab';

export default class Checkbox extends Component {
  render() {
    return (
      <div>
        <MultiLangMarkdown text={ReadmeText} />

        <ExampleContainer
          title="Base example"
          code={ExampleBaseCode}
        >
          <ExampleBase />
        </ExampleContainer>

        <ExampleContainer
          title="Nested example"
          code={ExampleNestedCode}
        >
          <ExampleNested />
        </ExampleContainer>

        <ExampleContainer
          title="Disabled example"
          code={ExampleDisabledCode}
        >
          <ExampleDisabled />
        </ExampleContainer>

        <ExampleContainer
          title="Tab example"
          code={ExampleTabCode}
        >
          <ExampleTab />
        </ExampleContainer>

        <PropTypeDescription header="### Menu Properties" code={menuCode} />
        <PropTypeDescription header="### SubMenu Properties" code={subMenuCode} />
        <PropTypeDescription header="### MenuItem Properties" code={menuItemCode} />
      </div>
    );
  }
}
