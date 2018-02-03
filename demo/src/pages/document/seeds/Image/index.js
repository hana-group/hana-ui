import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import ReadmeText from './README';
import code from '!raw-loader!hana-ui/seeds/Image/Image';
import codeGroup from '!raw-loader!hana-ui/seeds/Image/ImageGroup';
import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';

import ExampleGroup from './ExampleGroup';
import ExampleGroupCode from '!raw-loader!./ExampleGroup';

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
          title="Group example"
          code={ExampleGroupCode}
        >
          <ExampleGroup />
        </ExampleContainer>

        <PropTypeDescription code={code} header="### Image PropTypes" />

        <PropTypeDescription code={codeGroup} header="### ImageGroup PropTypes" />
      </div>
    );
  }
}
