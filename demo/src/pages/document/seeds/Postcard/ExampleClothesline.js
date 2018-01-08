import React, {Component} from 'react';
import {Postcard, PostcardGroup, Image} from 'hana-ui';

/**
 * 3 different size of Icon.
 */
const styles = {
  width: 200
};

export default class ExampleBase extends Component {
  render() {
    return (
      <div>
        <p style={{margin: '15px 0'}}>group</p>
        <PostcardGroup mode="clothesline">
          <Postcard title="Doge1" style={styles}>
            <Image src="https://t4.kn3.net/taringa/5/C/0/6/C/9/DogeDogOficial/59C.jpg" fullWidth />
          </Postcard>
          <Postcard title="Doge2" style={styles}>
            <Image src="https://t4.kn3.net/taringa/5/C/0/6/C/9/DogeDogOficial/59C.jpg" fullWidth />
          </Postcard>
          <Postcard title="Doge3" style={styles}>
            <Image src="https://t4.kn3.net/taringa/5/C/0/6/C/9/DogeDogOficial/59C.jpg" fullWidth />
          </Postcard>
        </PostcardGroup>
      </div>
    );
  }
}
