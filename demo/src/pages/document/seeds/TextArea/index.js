/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/7
 */
import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import readmeText from './README';
import code from '!raw-loader!hana-ui/seeds/TextArea/TextArea';
import ExampleBase from './ExampleBase';
import exampleBaseCode from '!raw-loader!./ExampleBase';
import ExampleStates from './ExampleStates';
import exampleStatesCode from '!raw-loader!./ExampleStates';
import ExampleSizes from './ExampleSizes';
import exampleSizesCode from '!raw-loader!./ExampleSizes';
import ExampleIcons from './ExampleIcons';
import exampleIconsCode from '!raw-loader!./ExampleIcons';
import ExampleStyles from './ExampleStyles';
import exampleStylesCode from '!raw-loader!./ExampleStyles';

export default class Text extends Component {
  render() {
    return (
      <div>
        <MultiLangMarkdown text={readmeText} />
        <ExampleContainer
          title="Base examples"
          code={exampleBaseCode}
        >
          <ExampleBase />
        </ExampleContainer>
        <ExampleContainer
          title="States examples"
          code={exampleStatesCode}
        >
          <ExampleStates />
        </ExampleContainer>
        <ExampleContainer
          title="Sizes examples"
          code={exampleSizesCode}
        >
          <ExampleSizes />
        </ExampleContainer>
        <ExampleContainer
          title="Icons examples"
          code={exampleIconsCode}
        >
          <ExampleIcons />
        </ExampleContainer>
        <ExampleContainer
          title="Styles examples"
          code={exampleStylesCode}
        >
          <ExampleStyles />
        </ExampleContainer>
        <PropTypeDescription code={code} />
      </div>
    );
  }
}
