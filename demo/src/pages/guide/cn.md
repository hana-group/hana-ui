# 开始

hana-ui 拥有完善的、前端开发所需的基础组件，并支持自定义主题，简单上手即可进行开发.

## 安装

```bash
npm install hana-ui

// or

yarn add hana-ui
```

## 使用

#### 引用组件

以下以`Button` 组件为例写一个简单的例子：

(TODO: 补充codepen)

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

更多组件使用方法请查看[文档]('/cn/document')页面

## 兼容性

hana-ui 使用es6 进行开发，并使用`babel` 进行编译

## 自定义主题
