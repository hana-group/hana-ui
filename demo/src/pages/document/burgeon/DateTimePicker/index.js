/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/6
 */
import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import readmeText from './README';
import code from '!raw-loader!hana-ui/burgeon/DateTimePicker/DateTimePicker';
import ExampleBase from './ExampleBase';
import exampleBaseCode from '!raw-loader!./ExampleBase';

export default class DateTimePicker extends Component {
  render() {
    return (
      <div>
        <MultiLangMarkdown text={readmeText} />

        <ExampleContainer
          code={exampleBaseCode}
        >
          <ExampleBase />
        </ExampleContainer>

        <PropTypeDescription code={code} />
      </div>
    );
  }
}
