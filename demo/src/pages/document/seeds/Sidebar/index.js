import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MarkdownElement from 'demo/MarkdownElement';

import sidebarCode from '!raw-loader!hana-ui/seeds/Sidebar/Sidebar';
import ReadmeText from './README';

import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';

export default class Sidebar extends Component {
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
        <PropTypeDescription code={sidebarCode} header={'### Sidebar Properties'} />
      </div>
    );
  }
}
