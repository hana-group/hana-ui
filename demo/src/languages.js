/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/1
 */
export const languages = [
  {
    value: 'cn',
    label: '简体中文',
    tableHeader: `
### 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|:-----|:-----|:-----|:-----|
`,
    tableFooter: '未在文档中说明的属性将会被自动加到根元素或form元素上。'
  },
  {
    value: 'en',
    label: 'English',
    tableHeader: `
### Properties

| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
`,
    tableFooter: 'Other properties (no documented) are applied to the root or form element.'
  }
];

const langObj = {};
languages.forEach(l => {
  langObj[l.value] = l;
});
export const langList = languages.map(l => l.value);
export const langRegexLines = new RegExp(
  `(@(${langList.join('|')})[\\s\\S]+?)(?=@(${langList.join('|')})|$)`, 'g'
);
export const langRegexLine = new RegExp(`@(${langList.join('|')})\\s([\\S\\s]*)`);
export const langRegexLineWithHeader = new RegExp(`@(${langList.join('|')})\\s+(.+)\\s+([\\s\\S]*)`);

export const langManager = {
  current: 'en',
  set (lang) {
    this.current = lang;
  },
  get lang() {
    return this.current;
  },
  getCurrent() {
    return langObj[this.current];
  }
};
