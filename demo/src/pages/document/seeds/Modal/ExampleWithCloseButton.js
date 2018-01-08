import React, {Component} from 'react';
import {Button, Modal, Icon} from 'hana-ui';

export default class ExampleWithCloseButton extends Component {
  state = {
    show: false,
    showClose: true,
    withoutTitleModal: false
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
        <Button style={{marginRight: 10}} onClick={() => this.toggleModal('show')}>
          open
        </Button>
        <Button onClick={() => this.toggleModal('withoutTitleModal')}>
          No title
        </Button>
        <Modal
          title={'Title'}
          show={this.state.show}
          showClose={this.state.showClose}
          close={<Icon type={'close'} onClick={() => this.toggleModal('show')} />}
        >
          <img alt={''} src={'https://i0.hdslb.com/group1/M00/B7/3B/oYYBAFcwBcaAbRbPAAEsUAyAdWQ392.gif'} />
        </Modal>
        <Modal
          show={this.state.withoutTitleModal}
          showClose={this.state.showClose}
          close={<Icon type={'close'} onClick={() => this.toggleModal('withoutTitleModal')} />}
        >
          <img alt={''} src={'https://i0.hdslb.com/group1/M00/B7/3B/oYYBAFcwBcaAbRbPAAEsUAyAdWQ392.gif'} />
        </Modal>
      </div>
    );
  }
}
