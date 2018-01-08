/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/16
 */
import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import readmeText from './README';
import code from '!raw-loader!hana-ui/seeds/DatePicker/DatePicker';
import ExampleBase from './ExampleBase';
import exampleBaseCode from '!raw-loader!./ExampleBase';
import ExampleLang from './ExampleLang';
import exampleLangCode from '!raw-loader!./ExampleLang';
import ExampleView from './ExampleView';
import exampleViewCode from '!raw-loader!./ExampleView';
import ExampleNames from './ExampleNames';
import exampleNamesCode from '!raw-loader!./ExampleNames';
import ExampleRange from './ExampleRange';
import exampleRangeCode from '!raw-loader!./ExampleRange';

export default class Text extends Component {
  render() {
    return (
      <div>
        <MultiLangMarkdown text={readmeText} />
        <ExampleContainer
          code={exampleBaseCode}
        >
          <ExampleBase />
        </ExampleContainer>
        <ExampleContainer
          code={exampleLangCode}
        >
          <ExampleLang />
        </ExampleContainer>
        <ExampleContainer
          code={exampleViewCode}
        >
          <ExampleView />
        </ExampleContainer>
        <ExampleContainer
          code={exampleNamesCode}
        >
          <ExampleNames />
        </ExampleContainer>
        <ExampleContainer
          code={exampleRangeCode}
        >
          <ExampleRange />
        </ExampleContainer>
        <PropTypeDescription code={code} />
      </div>
    );
  }
}
