import React, {Component} from 'react';
import ExampleContainer from 'demo/ExampleContainer';
import PropTypeDescription from 'demo/PropTypeDescription';
import MarkdownElement from 'demo/MarkdownElement';

import notificationsCode from '!raw-loader!hana-ui/seeds/Notification/Notifications';
import notificationCode from '!raw-loader!hana-ui/seeds/Notification/Notification';
import ReadmeText from './README';

import ExampleBase from './ExampleBase';
import ExampleBaseCode from '!raw-loader!./ExampleBase';

export default class Notification extends Component {
  render() {
    return (
      <div>
        <MarkdownElement text={ReadmeText} />

        <ExampleContainer
          title={'Base Example'}
          code={ExampleBaseCode}
        >
          Normal notification will auto hide after 2.5s
          <br /><br />
          <ExampleBase />
        </ExampleContainer>

        <PropTypeDescription code={notificationsCode} header={'### Notifications Properties'} />
        <PropTypeDescription code={notificationCode} header={'### Notification Properties'} />
      </div>
    );
  }
}
