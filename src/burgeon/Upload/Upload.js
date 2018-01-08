/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/6
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UploadBase from './UploadBase';
import UploadBox from './UploadBox';

import {nop} from './utils';

export default class Upload extends Component {
  static propTypes = {
    /**
     * @en
     * The predefined view type.
     *
     * @cn
     * 预设的显示类型。
     */
    view: PropTypes.oneOf(['base', 'box']),
    /**
     * @en
     * Default interface for uploading for all files,
     * hana also allows you to set different interface for each file,
     * check it in property `parseFileObj`.
     *
     * @cn
     * 所有文件上传时默认使用的接口，当然，hana也提供了方式为每个文件单独设置接口，详见`parseFileObj`属性。
     */
    url: PropTypes.string.isRequired,
    /**
     * @en
     * Whether all files would be uploaded automatically after selecting.
     *
     * @cn
     * 是否开启自动上传，若开启，文件将会在添加后自动上传。
     */
    auto: PropTypes.bool,
    /**
     * @en
     * Whether multiple files could be selected.
     *
     * @cn
     * 是否开启多选模式。
     */
    multiple: PropTypes.bool,
    /**
     * @en
     * This property will be passed to property `accept` of HTML `input`.
     *
     * @cn
     * 可选文件的类型，等价于`HTML`规范中`input`元素中的`accept`属性。
     */
    type: PropTypes.string,
    /**
     * @en
     * If true, this component will be disabled.
     *
     * @cn
     * 是否要禁用上传功能。
     */
    disabled: PropTypes.bool,
    /**
     * @en
     * A callback will be called after a file was selected but not added to files queue,
     * she should return an object which contents your needed properties,
     * hana will add those to the new file-object.
     *
     * If you want to add the independent `url`, `data` or `header`...you could set them here.
     *
     * file => Object
     *
     * @cn
     * 当文件被选择后、添加到队列前执行的回调，返回一个对象，hana通过这个返回值来为生成的文件对象添加你想要的属性。
     * 若想添加文件独有的`url`、`data`、`header`等，可以在此处设置。
     *
     * file => Object
     */
    parseFileObj: PropTypes.func,
    /**
     * @en
     * A callback will be called after a file was selected but not added to files queue,
     * she should return true or false to decide if this file will be added to files queue.
     *
     * file => bool
     *
     * @cn
     * 当文件被选择后、添加到队列前执行的回调，返回一个`Bool`值，用于决定是否将该文件添加到队列中。
     *
     * file => bool
     */
    filterFileObj: PropTypes.func,
    /**
     * @en
     * Data filed for all files while uploading,
     * you can set an independent one for each file as same as `url`.
     *
     * @cn
     * 所有文件上传时默认使用的数据域，独立设置同`url`中的方法。
     */
    data: PropTypes.object,
    /**
     * @en
     *
     * Request headers for all files while uploading,
     * you can set an independent one for each file as same as `url`.
     *
     * @cn
     * 所有文件上传时默认使用的请求头，独立设置同`url`中的方法。
     */
    headers: PropTypes.object,
    /**
     * @en
     * A callback will be called after a file was added to files queue.
     *
     * @cn
     * 当文件被添加到队列后触发的回调。
     *
     * fileObj => void
     */
    onChoose: PropTypes.func,
    /**
     * @en
     * A callback will be called before the start of file uploading.
     *
     * @cn
     * 文件开始传输之前触发的回调。
     *
     * fileObj => void
     */
    onStart: PropTypes.func,
    /**
     * @en
     * A callback will be called while the file uploading is processing.
     *
     * (event, fileObj) => void
     *
     * @cn
     * 文件传输过程中触发的回调。
     *
     * (event, fileObj) => void
     */
    onProgress: PropTypes.func,
    /**
     * @en
     * A callback will be called after the file was uploaded successful.
     *
     * (response, fileObj) => void
     *
     * @cn
     * 文件传输成功时触发的回调。
     *
     * (response, fileObj) => void
     */
    onSuccess: PropTypes.func,
    /**
     * @en
     * A callback will be called after the file uploading caused some error.
     *
     * (error, response, fileObj) => void
     *
     * @cn
     * 文件传输出错时触发的回调。
     *
     * (error, response, fileObj) => void
     */
    onError: PropTypes.func,
    /**
     * @en
     * Whether pass the `cookie` while uploading.
     *
     * @cn
     * 上传请求时是否携带`cookie`.
     */
    withCredentials: PropTypes.bool,
    /**
     * @en
     * A method for customizing view likes property `children`,
     * she will pass you a list contains all valid files, and expect a `node` as result,
     * this `node` will be placed on DOM to replace the default one.
     *
     * Of course, hana know you need some core method to operate files,
     * hana already wrote the last example about theme, please check that.
     *
     * files => node
     *
     * @cn
     * 一个用于自定义视图的方法，类似于传统意义上的`children`属性，
     * 她提供一个当前所有文件的列表，期望返回一个`node`，此`node`将会替代默认的视图被渲染到DOM上。
     *
     * hana明白你的疑惑，在这种模式下，必须有一些上传相关的核心方法被提供，
     * 关于这些方法，hana已经很详细地写到了最后一个例子中，请仔细阅读。
     *
     * files => node
     */
    renderContent: PropTypes.func
  };

  static defaultProps = {
    view: 'base',
    url: '',
    auto: true,
    multiple: false,
    type: '*',
    data: {},
    headers: {},
    parseFileObj: nop,
    filterFileObj: () => true,
    onChoose: nop,
    onStart: nop,
    onProgress: nop,
    onSuccess: nop,
    onError: nop,
    disabled: false,
    withCredentials: false
  };

  render() {
    const {
      view,
      ...otherProps
    } = this.props;

    if (view === 'base') {
      return (
        <UploadBase
          {...otherProps}
        />
      );
    }

    if (view === 'box') {
      return (
        <UploadBox
          {...otherProps}
        />
      );
    }

    return null;
  }
}
