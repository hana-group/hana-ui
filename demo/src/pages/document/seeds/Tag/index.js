import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MarkdownElement from 'demo/MarkdownElement';

import Readme from './README';
import code from '!raw-loader!hana-ui/seeds/Tag/Tag';
import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';

import ExampleSize from './ExampleSize';
import ExampleSizeCode from '!raw-loader!./ExampleSize';

import ExampleColorful from './ExampleColorful';
import ExampleColorfulCode from '!raw-loader!./ExampleColorful';

export default class Demo extends Component {
  render() {
    return (
      <div>
        <MarkdownElement text={Readme} />
        <ExampleContainer
          title="Base example"
          code={ExampleBaseCode}
        >
          <ExampleBase />
        </ExampleContainer>

        <ExampleContainer
          title="Size example"
          code={ExampleSizeCode}
        >
          <ExampleSize />
        </ExampleContainer>

        <ExampleContainer
          title="Colorful example"
          code={ExampleColorfulCode}
        >
          <ExampleColorful />
        </ExampleContainer>

        <PropTypeDescription code={code} />
      </div>
    );
  }
}
