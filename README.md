# hana-ui

![logo](https://github.com/hana-group/hana-ui/raw/master/demo/static/images/logo.png)

🌻A React UIKit with fresh nijigen style.

Homepage: [hana-ui.moe](http://hana-ui.moe/en).
主页：[hana-ui.moe/cn](http://hana-ui.moe/cn).

## Guide

hana-ui is a completed UI component libray which almost base components that you may use in development works, and it also easy to use in your page.

### Install

```bash
npm install hana-ui

// or

yarn add hana-ui
```

### Usage

#### Configuration

Before using hana-ui, you should import the default configuration of styles to ensure hana could build application successfully:  

```js
import 'hana-ui/hana-style.scss';
```

On the other hand, for allowing user to use their own themes and import independent component, please add loaders for **scss** files in configuration file of webpack and ensure **the `node_modules` is not added to rule `exclude`.**

>Note: hana-ui also supports typescript with d.ts files, and we commend you to use it !

#### import hana-ui in your page

Example:

```javascript
import React from 'react';
import {Button} from 'hana-ui';
// or just import Button
import {Button} from 'hana-ui/dist/seeds/Button';

export default () => (
  <Button size={'middle'}>
    Touch me...
  </Button>    
);
```

More components usage please checkout [Documents](https://hana-ui.moe/en/document) page.

#### Custom Theme

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


## Contribution

Change the world with hana.

### How

You could contribute to hana-ui in may ways, hana needs your help.

#### Tell to us

1. Open the project [hana-ui](https://github.com/hana-group/hana-ui) on Github.
2. Submit your **issue** with detailed description, code and error stack.
3. We will have a discussion and find the way to fix bugs. 
4. Bugs are fixed.

#### Fix by yourself

1. Open the project [hana-ui](https://github.com/hana-group/hana-ui) on Github.
2. Fork it and fix bugs in a new branch.
3. Open a **pull request** with detailed description such as information, scope of influence...
4. We will review changes and merge it to master branch.

### Scripts

Following npm scripts may help you while developing.

**1. Develop:**

```bash
npm run dev
```

Then open the **8000** port and preview the demo.

**1. Prebuilt:**

```bash
npm run build
```

Compile source code to **dist** folder with es5.

## License

hana-ui is an open-source project with [MIT](https://opensource.org/licenses/MIT) license by [hana-group](https://github.com/hana-group).  

Welcome to join us !
