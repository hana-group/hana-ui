import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import buttonCode from '!raw-loader!hana-ui/seeds/Button/Button';
import buttonGroupCode from '!raw-loader!hana-ui/seeds/Button/ButtonGroup';
import ReadmeText from './README';

import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';
import ExampleIcon from './ExampleIcon';
import ExampleIconCode from '!raw-loader!./ExampleIcon';
import ExampleLabel from './ExampleLabel';
import ExampleLabelCode from '!raw-loader!./ExampleLabel';
import ExampleGroup from './ExampleGroup';
import ExampleGroupCode from '!raw-loader!./ExampleGroup';

export default class Button extends Component {
  render() {
    return (
      <div>
        <MultiLangMarkdown text={ReadmeText} />

        <ExampleContainer
          title={'Base Example'}
          code={ExampleBaseCode}
        >
          <ExampleBase />
        </ExampleContainer>

        <ExampleContainer
          title={'Base Icon Button Example'}
          code={ExampleIconCode}
        >
          <ExampleIcon />
        </ExampleContainer>

        <ExampleContainer
          title={'Base Button With Label Example'}
          code={ExampleLabelCode}
        >
          <ExampleLabel />
        </ExampleContainer>

        <ExampleContainer
          title={'Base Button Group Example'}
          code={ExampleGroupCode}
        >
          <ExampleGroup />
        </ExampleContainer>

        <PropTypeDescription code={buttonCode} header={'### Button Properties'} />
        <PropTypeDescription code={buttonGroupCode} header={'### ButtonGroup Properties'} />
      </div>
    );
  }
}
