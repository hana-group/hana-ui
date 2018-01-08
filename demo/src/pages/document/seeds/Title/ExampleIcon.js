import React, {Component} from 'react';
import {Title, Icon} from 'hana-ui';

export default class ExampleIcon extends Component {
  render() {
    return (
      <div>
        <Title
          icon={<Icon type={'menu'} color={'#199ed8'} />}
          iconRight={
            <div>
              <Icon type={'hana'} color={'#199ed8'} />
              <Icon type={'delete'} color={'red'} />
            </div>
          }
          leftIconClick={() => {
            alert('click'); // eslint-disable-line
          }}
        >
          (ง •̀_•́)
        </Title>
      </div>
    );
  }
}
