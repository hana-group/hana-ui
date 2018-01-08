import code from '!raw-loader!hana-ui/styles/mixin/icon.scss';

function getIcons() {
  const str = code.match(/\$icons[\s\S]+\);/g)[0];
  const arr = str.split('\n');

  const result = arr.map(item => {
    const s = item.trim();
    const match = s.match(/"\\e[\s\S]+?"/);
    if (match) {
      const unicode = match[0].replace(/"/g, '');

      const nameMatch = s.match(/ "[^\\][\s\S]+?"/) || [''];
      const name = nameMatch[0].trim().replace(/"/g, '');
      return {
        name,
        unicode
      };
    }
    return null;
  });

  return result;
}

export default getIcons;
