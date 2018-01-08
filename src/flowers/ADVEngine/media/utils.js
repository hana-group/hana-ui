import systemVariables from '../systemVariables';
import {upperFirst} from 'lodash';

export function getVolumes(type) {
  const has = systemVariables.getVar(`has${upperFirst(type)}`);
  const volume = systemVariables.getVar(`${type}Volumes`);
  return Boolean(has) * volume;
}
