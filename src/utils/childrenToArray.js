import isArray from 'lodash/isArray';
import flattenDeep from 'lodash/flattenDeep';
import remove from 'lodash/remove';

export default function childrenToArray(children) {
  if (!children) return [];
  if (!isArray(children)) return [children];
  return remove(flattenDeep(children), null);
}
