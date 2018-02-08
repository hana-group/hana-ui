import React, {Component} from 'react';
import {Button, Modal} from 'hana-ui';

/**
 * @en
 * Base Example
 *
 * &nbsp;
 *
 * @cn
 * 基础示例
 *
 * &nbsp;
 */

export default class ExampleBase extends Component {
  state = {
    show: false,
    showConfirmModal: false,
    showCancelModal: false
  }

  toggleModal(key) {
    this.setState({[key]: !this.state[key]});
  }

  openConfirmModal() {
    this.setState({showConfirmModal: !this.state.showConfirmModal});
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.toggleModal('show')}>
          open
        </Button>
        <Modal
          id={'modal'}
          contentStyle={{height: 600}}
          show={this.state.show}
          confirm={() => this.toggleModal('show')}
          cancel={::this.openConfirmModal}
        >
          <img alt={''} src={'https://i0.hdslb.com/group1/M00/B7/3B/oYYBAFcwBcaAbRbPAAEsUAyAdWQ392.gif'} />
        </Modal>
        <Modal
          id={'modal-have-title'}
          contentStyle={{height: 200}}
          title={'关关关'}
          show={this.state.showConfirmModal}
          cancel={() => this.toggleModal('showConfirmModal')}
        >
          <img alt={''} src={'https://i0.hdslb.com/group1/M00/B7/3B/oYYBAFcwBcaAbRbPAAEsUAyAdWQ392.gif'} />
        </Modal>
      </div>
    );
  }
}
