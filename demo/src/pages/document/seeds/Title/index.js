import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import titleCode from '!raw-loader!hana-ui/seeds/Title';
import ReadmeText from './README';

import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';
import ExampleSubtitle from './ExampleSubtitle';
import ExampleSubtitleCode from '!raw-loader!./ExampleSubtitle';
import ExampleIcon from './ExampleIcon';
import ExampleIconCode from '!raw-loader!./ExampleIcon';

export default class Title extends Component {
  render() {
    return (
      <div>
        <MultiLangMarkdown text={ReadmeText} />

        <ExampleContainer
          title={'Base Example'}
          code={ExampleBaseCode}
        >
          <ExampleBase />
        </ExampleContainer>

        <ExampleContainer
          title={'Base Title With Subtitle Example'}
          code={ExampleSubtitleCode}
        >
          <ExampleSubtitle />
        </ExampleContainer>

        <ExampleContainer
          title={'Base Title With Icon Example'}
          code={ExampleIconCode}
        >
          <ExampleIcon />
        </ExampleContainer>

        <PropTypeDescription code={titleCode} header={'### Button Properties'} />
      </div>
    );
  }
}
