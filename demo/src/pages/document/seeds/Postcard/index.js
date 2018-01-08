import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MarkdownElement from 'demo/MarkdownElement';

import ReadmeText from './README';
import code from '!raw-loader!hana-ui/seeds/Postcard/Postcard';
import groupCode from '!raw-loader!hana-ui/seeds/Postcard/PostcardGroup';

import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';

import ExampleGroup from './ExampleGroup';
import ExampleGroupCode from '!raw-loader!./ExampleGroup';

// import ExampleClothesline from './ExampleClothesline';
// import ExampleClotheslineCode from '!raw-loader!./ExampleClothesline';


export default class Checkbox extends Component {
  render() {
    return (
      <div>
        <MarkdownElement text={ReadmeText} />

        <ExampleContainer
          title="Base example"
          code={ExampleBaseCode}
        >
          <ExampleBase />
        </ExampleContainer>

        <ExampleContainer
          title="Group example"
          code={ExampleGroupCode}
        >
          <ExampleGroup />
        </ExampleContainer>

        {
          /** <ExampleContainer
            title="Clothesline example"
            code={ExampleClotheslineCode}
          >
            <ExampleClothesline />
          </ExampleContainer>
          */
        }

        <PropTypeDescription code={code} header="### Postcard PropTypes" />

        <PropTypeDescription code={groupCode} header="### PostcardGroup PropTypes" />
      </div>
    );
  }
}
