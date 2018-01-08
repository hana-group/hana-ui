# Guide

hana-ui is a completed UI component libray which almost base components that you may use in development works, and it also easy to use in your page.

## Install

```bash
npm install hana-ui

// or

yarn add hana-ui
```

## Usage

#### import hana-ui in your page

Example:

```javascript
import React from 'react';
import {Button} from 'hana-ui';

export default class App extends React.Component {
  render() {
    return (
      <Button size={'middle'}>
        点我一下
      </Button>    
    )
  }
}
```

More components usage please checkout [document](/'en/document') page

## Compatible

hana-ui use ES6 as development base, also use `babel` to compile code.

## Custom Theme
