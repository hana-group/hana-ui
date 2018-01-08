import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MarkdownElement from 'demo/MarkdownElement';

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
        <MarkdownElement text={ReadmeText} />

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
          <p>
           Set showClose props to true will show the
           default close button,but also can use your custom close button
          </p>
          <br />
          <ExampleWithCloseButton />
        </ExampleContainer>

        <PropTypeDescription code={modalCode} header={'### Modal Properties'} />
      </div>
    );
  }
}
