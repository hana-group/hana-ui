/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/4
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';

import {init} from './game';

// for test
import systemVariables from './systemVariables';

export default class ADVEngine extends Component {
  static propTypes = {
    show: PropTypes.bool
  };

  static defaultProps = {

  };

  componentDidMount() {
    const dom = findDOMNode(this.refs.container);
    init(dom);
  }

  render() {
    const musicVolume = systemVariables.getVar('musicVolumes');
    return (
      <div>
        <div
          ref={'container'}
          style={{
            width: 800,
            height: 600,
            border: '1px solid black'
          }}
        >
        </div>
        <span style={{display: 'inline-block', width: 200}}>背景音量：{Math.round(musicVolume * 100)}</span>
        <input
          type="range"
          name="volume"
          value={Math.round(musicVolume * 100)}
          min="0"
          max="100"
          onChange={e => {
            systemVariables.setVar('musicVolumes', e.target.value / 100);
            this.setState({});
          }}
        />
      </div>
    );
  }
}
