/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/9
 */
import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import readmeText from './README';
import code from '!raw-loader!hana-ui/seeds/Pagination/Pagination';
import ExampleBase from './ExampleBase';
import exampleBaseCode from '!raw-loader!./ExampleBase';
import ExampleView from './ExampleView';
import exampleViewCode from '!raw-loader!./ExampleView';
import ExampleSize from './ExampleSize';
import exampleSizeCode from '!raw-loader!./ExampleSize';

export default class Pagination extends Component {
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
          title="View examples"
          code={exampleViewCode}
        >
          <ExampleView />
        </ExampleContainer>
        <ExampleContainer
          title="Size examples"
          code={exampleSizeCode}
        >
          <ExampleSize />
        </ExampleContainer>
        <PropTypeDescription code={code} />
      </div>
    );
  }
}
