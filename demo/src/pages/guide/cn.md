# 开始

hana-ui 拥有完善的、前端开发所需的基础组件，并支持自定义主题，简单上手即可进行开发。

## 安装

```bash
npm install hana-ui

// 或

yarn add hana-ui
```

## 使用

### 配置

在使用组件库之前，你需要导入默认的样式配置，来保证hana能够正确构建应用：  

```js
import 'hana-ui/hana-style.scss';
```

与此同时，由于hana使用scss作为样式文件，并允许自定义主题且可以单独引用组件，所以请为scss文件配置webpack规则，并务必保证**在你的webpack配置的scss文件相关配置中，没有将`node_modules`配置为`exclude`**。

### 引用组件

以下以`Button` 组件为例写一个简单的例子：

(TODO: 补充codepen)

```javascript
import React from 'react';
import {Button} from 'hana-ui';

// 或者仅仅import Button 组件，而非所有
import {Button} from 'hana-ui/dist/seeds/Button';

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

更多组件使用方法请查看[文档]('/cn/document')页面。

## 自定义主题

hana允许你使用自己的主题，通过使用**[sass-resource-loader](https://github.com/shakacode/sass-resources-loader)**，你可以传入一个自定义的样式配置文件进行配置:  

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

配置模板可以参考：[himawari.scss](https://github.com/hana-group/hana-ui/blob/master/themes/himawari.scss)。
