import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MarkdownElement from 'demo/MarkdownElement';

import tableCode from '!raw-loader!hana-ui/seeds/Table/Table';
import ReadmeText from './README';

import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';
import ExampleColumnWidth from './ExampleColumnWidth';
import ExampleColumnWidthCode from '!raw-loader!./ExampleColumnWidth';
import ExampleSelectHover from './ExampleSelectHover';
import ExampleSelectHoverCode from '!raw-loader!./ExampleSelectHover';
import ExampleSelectRow from './ExampleSelectRow';
import ExampleSelectRowCode from '!raw-loader!./ExampleSelectRow';

export default class Table extends Component {
  render() {
    return (
      <div>
        <MarkdownElement text={ReadmeText} />

        <ExampleContainer title={'Base Example'} code={ExampleBaseCode}>
          <ExampleBase />
        </ExampleContainer>

        <ExampleContainer title={'Custom Table column width Example'} code={ExampleColumnWidthCode}>
          <ExampleColumnWidth />
        </ExampleContainer>

        <ExampleContainer title={'Selectable and hoverable Example'} code={ExampleSelectHoverCode}>
          <ExampleSelectHover />
        </ExampleContainer>

        <ExampleContainer title={'Outside selectedRow Control Example'} code={ExampleSelectRowCode}>
          <ExampleSelectRow />
        </ExampleContainer>

        <PropTypeDescription code={tableCode} header={'### Table Properties'} />
      </div>
    );
  }
}
