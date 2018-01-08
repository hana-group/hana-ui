/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/28
 */
import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import textReadmeText from './README';
import textCode from '!raw-loader!hana-ui/seeds/Text/Text';
import TextExampleBase from './ExampleBase';
import textExampleBaseCode from '!raw-loader!./ExampleBase';
import TextExampleView from './ExampleView';
import textExampleViewCode from '!raw-loader!./ExampleView';
import TextExampleStates from './ExampleStates';
import textExampleStatesCode from '!raw-loader!./ExampleStates';
import TextExampleSizes from './ExampleSizes';
import textExampleSizesCode from '!raw-loader!./ExampleSizes';
import TextExampleTypes from './ExampleTypes';
import textExampleTypesCode from '!raw-loader!./ExampleTypes';
import TextExampleIcons from './ExampleIcons';
import textExampleIconsCode from '!raw-loader!./ExampleIcons';
import TextExampleStyles from './ExampleStyles';
import textExampleStylesCode from '!raw-loader!./ExampleStyles';

export default class Text extends Component {
  render() {
    return (
      <div>
        <MultiLangMarkdown text={textReadmeText} />
        <ExampleContainer
          title="Base examples"
          code={textExampleBaseCode}
        >
          <TextExampleBase />
        </ExampleContainer>
        <ExampleContainer
          title="View examples"
          code={textExampleViewCode}
        >
          <TextExampleView />
        </ExampleContainer>
        <ExampleContainer
          title="States examples"
          code={textExampleStatesCode}
        >
          <TextExampleStates />
        </ExampleContainer>
        <ExampleContainer
          title="Sizes examples"
          code={textExampleSizesCode}
        >
          <TextExampleSizes />
        </ExampleContainer>
        <ExampleContainer
          title="Types examples"
          code={textExampleTypesCode}
        >
          <TextExampleTypes />
        </ExampleContainer>
        <ExampleContainer
          title="Icons examples"
          code={textExampleIconsCode}
        >
          <TextExampleIcons />
        </ExampleContainer>
        <ExampleContainer
          title="Styles examples"
          code={textExampleStylesCode}
        >
          <TextExampleStyles />
        </ExampleContainer>
        <PropTypeDescription code={textCode} />
      </div>
    );
  }
}
