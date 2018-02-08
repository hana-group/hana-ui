import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import modalCode from '!raw-loader!hana-ui/seeds/Modal/Modal';
import ReadmeText from './README';

import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';
import ExampleActions from './ExampleActions';
import ExampleActionsCode from '!raw-loader!./ExampleActions';
import ExampleWithCloseButton from './ExampleWithCloseButton';
import ExampleWithCloseButtonCode from '!raw-loader!./ExampleWithCloseButton';

export default class Modal extends Component {
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
          title={'Custom Action Button Example'}
          code={ExampleActionsCode}
        >
          <ExampleActions />
        </ExampleContainer>

        <ExampleContainer
          title={'Modal with Close Button Example'}
          code={ExampleWithCloseButtonCode}
        >
          <ExampleWithCloseButton />
        </ExampleContainer>

        <PropTypeDescription code={modalCode} header={'### Modal Properties'} />
      </div>
    );
  }
}
