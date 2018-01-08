/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/4
 */
import {Component} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class RenderToNode extends Component {
  static propTypes = {
    // show: PropTypes.bool,
    node: PropTypes.object,
    // childRef: PropTypes.object,
    // leaveTimeout: PropTypes.number,
    children: PropTypes.node
  };

  static defaultProps = {
    // show: false,
    node: null,
    // childRef: null,
    // leaveTimeout: 0,
    children: null
  };

  // constructor(props) {
  //   super(props);
  //   this.child = null;
  //   this.timeoutId = 0;
  // }

  // componentDidMount() {
  //   this.refresh();
  // }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.show || nextProps.show;
  // }

  // componentDidUpdate() {
  //   this.refresh();
  // }

  // componentWillUnmount() {
  //   this.removeFromNode();
  // }

  // addToNode = () => {
  //   const {
  //     node,
  //     childRef
  //   } = this.props;

  //   if (this.child === null) {
  //     this.child = document.createElement('div');
  //   }
  //   this.child.appendChild(findDOMNode(childRef));

  //   node.appendChild(this.child);
  // };

  // removeFromNode = () => {
  //   const {
  //     node
  //   } = this.props;

  //   if (this.child === null) {
  //     return;
  //   }

  //   node.removeChild(this.child);
  //   this.child = null;
  // };

  // refresh = () => {
  //   const {
  //     show,
  //     leaveTimeout
  //   } = this.props;

  //   if (this.timeoutId) {
  //     clearTimeout(this.timeoutId);
  //   }

  //   if (show) {
  //     this.addToNode();
  //   } else {
  //     this.timeoutId = setTimeout(this.removeFromNode, leaveTimeout);
  //   }
  // };

  render() {
    const {
      children,
      node
    } = this.props;

    // for ssr
    const body = document.body || 'wtf';
    if (body === 'wtf') {
      return children;
    }

    return createPortal(children, node || body);
  }
}
