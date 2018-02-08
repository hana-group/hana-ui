import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import ReadmeText from './README';
import code from '!raw-loader!hana-ui/burgeon/Card/Card';
import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';

import ExampleExpand from './ExampleExpand';
import ExampleExpandCode from '!raw-loader!./ExampleExpand';

export default class Card extends Component {
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
          title="Expand example"
          code={ExampleExpandCode}
        >
          <ExampleExpand />
        </ExampleContainer>

        <PropTypeDescription code={code} />
      </div>
    );
  }
}
