import forIn from 'lodash/forIn';

/**
 * get rest props by compare component's propTypes and props
 * @param  {class} component react-component
 * @param  {object} props
 * @return {object} rest props object
 */
export default function getRestProps(component, props) {
  const result = {};

  forIn(props, (value, key) => {
    if (!component.propTypes[key]) result[key] = value;
  });

  return result;
}
