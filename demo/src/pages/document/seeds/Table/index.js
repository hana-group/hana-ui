import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import tableCode from '!raw-loader!hana-ui/seeds/Table/Table';
import ReadmeText from './README';

import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';
import ExampleColumnWidth from './ExampleColumnWidth';
import ExampleColumnWidthCode from '!raw-loader!./ExampleColumnWidth';
import ExampleSelectRow from './ExampleSelectRow';
import ExampleSelectRowCode from '!raw-loader!./ExampleSelectRow';

export default class Table extends Component {
  render() {
    return (
      <div>
        <MultiLangMarkdown text={ReadmeText} />

        <ExampleContainer title={'Base Example'} code={ExampleBaseCode}>
          <ExampleBase />
        </ExampleContainer>

        <ExampleContainer code={ExampleColumnWidthCode}>
          <ExampleColumnWidth />
        </ExampleContainer>

        <ExampleContainer code={ExampleSelectRowCode}>
          <ExampleSelectRow />
        </ExampleContainer>

        <PropTypeDescription code={tableCode} header={'### Table Properties'} />
      </div>
    );
  }
}
