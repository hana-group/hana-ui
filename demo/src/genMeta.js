/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 21 Feb 2018
 * Description:
 */
import {parseText} from './languages';
import componentsConfig from './pages/document/config';

const parseLang = (text) => {
  const tmp = /## (.+)\n([\s\S]*)/g.exec(text);
  return {
    title: `${tmp[1]} - hana-ui`,
    description: tmp[2].replace('\n', '')
  };
};

const parse = (text) => {
  const langsText = parseText(text);
  langsText.en = parseLang(langsText.en);
  langsText.cn = parseLang(langsText.cn);

  return langsText;
};

const table = {
  overview: parse(require('./pages/overview/README.md')),
  guide: parse(require('./pages/guide/README.md')),
  contribution: parse(require('./pages/contribution/README.md')),
  document: {}
};

Object.keys(componentsConfig).filter(key => key !== 'categories').map((name) => {
  table.document[name] = {};
  componentsConfig[name].map(({path, readme}) => {
    table.document[name][path] = parse(readme);
  });
});

export default (pathname) => {
  const params = pathname.split(/\//g).slice(1);
  const [lang, page, category, component] = params;

  if (page === 'overview') {
    table[page][lang].title = 'hana-ui';
  }

  if (page === 'overview' || page === 'guide' || page === 'contribution') {
    return table[page][lang];
  } else if (page !== 'document') {
    return table.overview[lang];
  }

  if (!category || !component) {
    return table.overview[lang];
  }

  return table.document[category][component][lang];
};
