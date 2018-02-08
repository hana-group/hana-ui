import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import ReadmeText from './README';
import code from '!raw-loader!hana-ui/burgeon/Form/Form';
import groupCode from '!raw-loader!hana-ui/burgeon/Form/FormGroup';
import itemCode from '!raw-loader!hana-ui/burgeon/Form/FormItem';
import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';

import ExampleComplex from './ExampleComplex';
import ExampleComplexCode from '!raw-loader!./ExampleComplex';

import ExampleLabelPosition from './ExampleLabelPosition';
import ExampleLabelPositionCode from '!raw-loader!./ExampleLabelPosition';

import ExampleCustom from './ExampleCustom';
import ExampleCustomCode from '!raw-loader!./ExampleCustom';

export default class Card extends Component {
  render() {
    return (
      <div>
        <MultiLangMarkdown text={ReadmeText} />

        <ExampleContainer
          title="Base example"
          code={ExampleBaseCode}
        >
          <ExampleBase />
        </ExampleContainer>

        <ExampleContainer
          title="Complex example"
          code={ExampleComplexCode}
        >
          <ExampleComplex />
        </ExampleContainer>

        <ExampleContainer
          title="LabelPosition example"
          code={ExampleLabelPositionCode}
        >
          <ExampleLabelPosition />
        </ExampleContainer>

        <ExampleContainer
          title="Custom example"
          code={ExampleCustomCode}
        >
          <ExampleCustom />
        </ExampleContainer>

        <PropTypeDescription code={code} header="### Form Properties" />
        <PropTypeDescription code={groupCode} header="### FormGroup Properties" />
        <PropTypeDescription code={itemCode} header="### FormItem Properties" />
      </div>
    );
  }
}
