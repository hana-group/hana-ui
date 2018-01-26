# Guide

hana-ui is a completed UI component libray which almost base components that you may use in development works, and it also easy to use in your page.

## Install

```bash
npm install hana-ui

// or

yarn add hana-ui
```

## Usage

### Configuration

Before using hana-ui, you should import the default configuration of styles to ensure hana could build application successfully:  

```js
import 'hana-ui/hana-style.scss';
```

On the other hand, for allowing user to use their own themes and import independent component, please add loaders for **scss** files in configuration file of webpack and ensure **the `node_modules` is not added to rule `exclude`.**

### import hana-ui in your page

Example:

```javascript
import React from 'react';
import {Button} from 'hana-ui';

// or just import Button, not all
import {Button} from 'hana-ui/dist/seeds/Button';

export default class App extends React.Component {
  render() {
    return (
      <Button size={'middle'}>
        Touch me...
      </Button>    
    )
  }
}
```

More components usage please checkout [document](/'en/document') page

### Custom Theme

hana allows you to use your own themes by using **[sass-resource-loader](https://github.com/shakacode/sass-resources-loader)**, you can pass a scss file includes configurations of theme to use it:  

```js
{
  test: /\.(css|sass|scss)$/,
  use: [
    ......
    {
      loader: 'sass-loader'
    },
    {
      loader: 'sass-resources-loader',
      options: {
        resources: './themes/himawari.scss'
      }
    }
  ],
  exclude: /node_modules/
},
```

You can check here for template of configurations: [himawari.scss](https://github.com/hana-group/hana-ui/blob/master/themes/himawari.scss).
