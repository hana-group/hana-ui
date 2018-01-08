/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/3
 */
import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MarkdownElement from 'demo/MarkdownElement';

import dividerReadmeText from './README';
import dividerCode from '!raw-loader!hana-ui/seeds/Divider/Divider';
import DividerExampleBase from './ExampleBase';
import dividerExampleBaseCode from '!raw-loader!./ExampleBase';

export default class Text extends Component {
  render() {
    return (
      <div>
        <MarkdownElement text={dividerReadmeText} />
        <ExampleContainer
          code={dividerExampleBaseCode}
        >
          <DividerExampleBase />
        </ExampleContainer>
        <PropTypeDescription code={dividerCode} />
      </div>
    );
  }
}
