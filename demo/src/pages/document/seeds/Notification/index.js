import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import notificationsCode from '!raw-loader!hana-ui/seeds/Notification/Notifications';
import notificationCode from '!raw-loader!hana-ui/seeds/Notification/Notification';
import ReadmeText from './README';

import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';

export default class Notification extends Component {
  render() {
    return (
      <div>
        <MultiLangMarkdown text={ReadmeText} />

        <ExampleContainer
          code={ExampleBaseCode}
        >
          <ExampleBase />
        </ExampleContainer>

        <PropTypeDescription code={notificationsCode} header={'### Notifications Properties'} />
        <PropTypeDescription code={notificationCode} header={'### Notification Properties'} />
      </div>
    );
  }
}
