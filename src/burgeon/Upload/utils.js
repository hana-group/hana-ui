/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/6
 */

export const nop = () => {};

export const parseFileObj = (file, index) => (
  {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.filename || file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    response: file.response,
    error: file.error,
    percent: 0,
    file,
    status: null,
    abort: null,
    index,
    state: 'init'
  }
);

const getError = (option, xhr) => {
  const msg = `cannot post ${option.url} ${xhr.status}'`;
  const err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = option.url;
  return err;
};

const getBody = xhr => {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
};

// option {
//  onProgress: (event: { percent: number }): void,
//  onError: (event: Error, body?: Object): void,
//  onSuccess: (body: Object): void,
//  file: {
//    data: Object,
//    name: String,
//    file: File,
//    headers: Object,
//    withCredentials: Boolean,
//    onProgress: (event: { percent: number }): void,
//    onError: (event: Error, body?: Object): void,
//    onSuccess: (body: Object): void,
//    withCredentials: Boolean,
//    url: String
//  }
//  withCredentials: Boolean,
//  url: String,
//  data: Object,
//  name: String,
//  file: File,
//  headers: Object,
// }
export const upload = option => {
  const {
    file
  } = option;

  const headers = file.headers || option.headers;
  const data = file.data || option.data;
  const url = file.url || option.url;
  const onProgress = file.onProgress || option.onProgress;
  const onError = file.onError || option.onError;
  const onSuccess = file.onSuccess || option.onSuccess;

  const xhr = new XMLHttpRequest();
  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
        file.percent = e.percent;
      }
      onProgress(e, file);
      file.state = 'uploading';
    };
  }

  const formData = new FormData();

  if (data) {
    Object.keys(data).map(key =>
      formData.append(key, data[key])
    );
  }

  formData.append(file.name, file.file);

  xhr.onerror = function error(e) {
    file.response = {};
    file.error = e;
    file.state = 'error';
    onError(file.error, file.response, file);
  };

  xhr.onload = function onload() {
    file.response = getBody(xhr);

    if (xhr.status < 200 || xhr.status >= 300) {
      file.error = getError(option, xhr);
      file.state = 'error';
      onError(file.error, file.response, file);
    } else {
      file.state = 'success';
      onSuccess(file.response, file);
    }
  };

  xhr.open('post', url, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  Object.keys(headers).forEach(h => {
    if (headers.hasOwnProperty(h) && headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  });
  xhr.send(formData);

  return {
    abort() {
      xhr.abort();
    }
  };
};
