import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MarkdownElement from 'demo/MarkdownElement';

import ReadmeText from './README';
import code from '!raw-loader!hana-ui/burgeon/IconButton/IconButton';
import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';

export default class IconButton extends Component {
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

        <PropTypeDescription code={code} />
      </div>
    );
  }
}
