# Demo

## 文档编写规范

### 文件结构

1. 所有的例子应当放到`demo`目录下的`src/pages`中，对应组件的例子文件结构应当与`hana-ui`中源文件的结构保持一致。
2. 每一个例子应当都是文件夹，由文件夹下的`index.js`作为顶层模块入口，其中的内容应当按照**下面一节的规范**编写。

```
demo
    |_src
        |_pages
            |_seeds
                |_Text
                    |_README.md
                    |_index.js
                    |_ExampleBase.js
                    ......
                |_Button
                ......
```

### 例子编写规范

1. `index.js`中应当统一为如下例子一般的规范：

```jsx
    import React, {Component} from 'react';
    import ExampleContainer from 'demo/ExampleContainer';
    import PropTypeDescription from 'demo/PropTypeDescription';
    import MarkdownElement from 'demo/MarkdownElement';

    import readmeText from './README';
    import code from '!raw!hana-ui/seeds/DatePicker/DatePicker';
    import ExampleBase from './ExampleBase';
    import exampleBaseCode from '!raw!./ExampleBase';
    import ExampleLang from './ExampleLang';
    import exampleLangCode from '!raw!./ExampleLang';
    ......

    export default class Text extends Component {
      render() {
        return (
          <div>
            <MarkdownElement text={readmeText} />
            <ExampleContainer
              code={exampleBaseCode}
            >
              <ExampleBase />
            </ExampleContainer>
            <ExampleContainer
              code={exampleLangCode}
            >
              <ExampleLang />
            </ExampleContainer>
            <PropTypeDescription code={code} />
          </div>
        );
      }
    }
```

其中`MarkdownElement`中的`readmeText`，是例子目录下的`README.md`。
`ExampleContainer`，是每一个子示例的容器，`code`属性是子示例以`raw`模式导入的源代码，`children`则是例子的组件。
`PropTypeDescription`是改组件源代码的文档，`code`属性是`raw`模式导入的组件源代码，需要配合规范的注释生成。

2. 每一个子示例的规范如下例子：

```jsx
    import React from 'react';
    import {DatePicker} from 'hana-ui';
    import ExampleBlock from 'demo/ExampleBlock';

    /**
     * @en
     * Mutil-Languages
     *
     * Hana provides property `lang` to support many languages,
     * 'en', 'cn' and 'jp' are currently supported.
     *
     * @cn
     * 多语言
     *
     * hana提供了`lang`属性用于配置组件的语言，现在支持英文`en`、中文`cn`和日文`jp`。
     *
     */
    export default () => (
      <div>
        <ExampleBlock
          en={(
            <p>English, lang = 'en'</p>
          )}
          cn={(
            <p>英文，lang = 'en'</p>
          )}
        >
          <DatePicker
            lang={'en'}
          />
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Chinese, lang = 'cn'</p>
          )}
          cn={(
            <p>中文，lang = 'cn'</p>
          )}
        >
          <DatePicker
            lang={'cn'}
          />
        </ExampleBlock>
      </div>
    );
```


示例编写分为两部分，第一部分是注释，他的编写以`@en`和`@cn`为间隔，`@en`下的是英文文档，`@cn`下的是中文文档，如果未来要加语言，也是一样的模式。
跟在`@en`这种语言标识后的第一行是子示例的`标题`，接下来的是解释说明的正文。

例子第二部分，则是例子组件自身。例子中的每一个演示都被包在`ExampleBlock`中，属性`en`、`cn`等是对应语言下要显示的例子的解释说明。
示例之间最好有一个空行分隔，以防用户看的时候觉得混杂。

3. 当要插入单独的Markdown文本时，可以使用`demo/MutilLnagMarkdown`组件，其语法规则与以上多语言的注释编写规则基本一致。

### 文档风格建议

1. 每一个例子的文档中的子例子（比如`Text/ExampleBase`）的Title，不用`Base Example`和`基础示例`这种表达，而是直接用`Base`和`基础`。
2. 当文档和注释中出现`它`和`it`时，替换成`她`和`her/she`；出现`我们/we/us`、`我/i/mine`时，替换成`hana`。
