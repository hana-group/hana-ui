[
  // normal ast
  {
    key: 'say',
    props: {who: 'dty', what: 'wtf'}
  },
  {
    key: 'scene',
    props: {image: 'bgxxxx', transition: 'linear'}
  },
  {
    key: 'show',
    props: {image: 'chyyyy', transition: 'linear', transform: ''}
  },
  {
    key: 'play',
    props: {type: 'music', transition: 'fadein', delay: 1, loop: true}
  },
  {
    key: 'stop',
    props: {type: 'music', transition: 'fadein', delay: 1, loop: true}
  },
  {
    key: 'pause',
    props: {time: 1}
  },
  //  definitions
  {
    key: 'define',
    props: {
      key: 'character',
      props: {name: 'dty', whoColor: 'red', whatColor: 'red', bg: 'a'}
    }
  },
  {
    key: 'define',
    props: {
      key: 'transition',
      props: {
        name: 'linear',
        type: 'linear',
        time: 1,
        attrs: {}
      }
    }
  },
  {
    key: 'define',
    props: {
      key: 'position',
      props: {
        x: 200, y: 100, rotate: 0
      }
    }
  },
  {
    key: 'define',
    props: {
      key: 'transform',
      props: {
        delay: 1,
        transition: 't1',
        from: 'position1',
        to: 'position2'
      }
    }
  }
];
