/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/4
 */
import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import readmeText from './README';
import code from '!raw-loader!hana-ui/seeds/Tooltip/Tooltip';
import ExampleBase from './ExampleBase';
import exampleBaseCode from '!raw-loader!./ExampleBase';
import ExampleView from './ExampleView';
import exampleViewCode from '!raw-loader!./ExampleView';
import ExamplePosition from './ExamplePosition';
import examplePositionCode from '!raw-loader!./ExamplePosition';
import ExampleTrigger from './ExampleTrigger';
import exampleTriggerCode from '!raw-loader!./ExampleTrigger';
import ExampleStyle from './ExampleStyle';
import exampleStyleCode from '!raw-loader!./ExampleStyle';

export default class Tooltip extends Component {
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
          code={exampleViewCode}
        >
          <ExampleView />
        </ExampleContainer>
        <ExampleContainer
          title="Position examples"
          code={examplePositionCode}
        >
          <ExamplePosition />
        </ExampleContainer>
        <ExampleContainer
          title="Trigger examples"
          code={exampleTriggerCode}
        >
          <ExampleTrigger />
        </ExampleContainer>
        <ExampleContainer
          title="Style examples"
          code={exampleStyleCode}
        >
          <ExampleStyle />
        </ExampleContainer>
        <PropTypeDescription code={code} />
      </div>
    );
  }
}
