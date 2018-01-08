import React, {Component} from 'react';
import {Postcard, Image} from 'hana-ui';


const styles = {
  width: 400
  // height: 250
};

/**
 * @en
 * Base
 *
 * A default postcard example.
 *
 * @cn
 * 基础
 *
 * 一个基本的明信片组件。
 */

export default class ExampleBase extends Component {
  render() {
    return (
      <div>
        <Postcard title="doge >>>" subtitle="(test)" style={styles}>
          <Image src="https://t4.kn3.net/taringa/5/C/0/6/C/9/DogeDogOficial/59C.jpg" fullWidth />
        </Postcard>
      </div>
    );
  }
}
