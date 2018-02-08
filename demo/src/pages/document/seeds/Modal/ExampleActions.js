import React, {Component} from 'react';
import {Button, Modal} from 'hana-ui';

const actionStyle = {
  marginRight: 5
};

/**
 * @en
 * Custom button
 *
 * &nbsp;
 *
 * @cn
 * 自定义回调按钮
 *
 * &nbsp;
 */

export default class ExampleActions extends Component {
  state = {
    show: false
  }

  toggleModal(key) {
    this.setState({[key]: !this.state[key]});
  }

  handleClick(type) {
    console.log('click %s', type); // eslint-disable-line
    this.toggleModal('show');
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.toggleModal('show')}>
          open
        </Button>
        <Modal
          show={this.state.show}
          actions={this.renderActions()}
        >
          <img alt={''} src={'https://i0.hdslb.com/group1/M00/B7/3B/oYYBAFcwBcaAbRbPAAEsUAyAdWQ392.gif'} />
        </Modal>
      </div>
    );
  }

  renderActions() {
    return [
      <Button
        key={'button-primary'}
        style={actionStyle}
        type={'primary'}
        onClick={() => this.handleClick('primary')}
      >
        primary
      </Button>,
      <Button
        key={'button-error'}
        style={actionStyle}
        type={'error'}
        onClick={() => this.handleClick('error')}
      >
        error
      </Button>,
      <Button
        key={'button-info'}
        style={actionStyle}
        onClick={() => this.handleClick('info')}
      >
        info
      </Button>
    ];
  }
}
