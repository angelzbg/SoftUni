import { useLocalObservable } from 'mobx-react';
import events from './events';

const FieldsObservable = (fields = []) => {
  const observable = useLocalObservable(() => ({
    fields,
    error: false,
    setError: (errorCode = '') => (observable.error = errorCode),
    setInput: (f = '', val = '') => {
      const field = observable.fields.find(({ name }) => name === f);
      field.value = val;
      field.error = false;
      observable.error = false;
    },
    validateFields: () => {
      let error = false;

      observable.fields.forEach((field) => {
        field.value = field.value.trim();
        const isValid = field.validate?.(field.value, observable) ?? true;
        field.error = !isValid;
        if (field.error) {
          error = true;
        }
      });

      return error;
    },
    getBody: () => Object.fromEntries(observable.fields.map(({ name, value }) => [name, value])),
  }));

  return observable;
};

const networkCall = async ({ path = '', method = '', body = {} }) => {
  if (
    !['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'].includes(method.toUpperCase())
  ) {
    throw new Error(`${method} is invalid CRUD method!`);
  }

  const controller = new AbortController();
  const { signal } = controller;
  const req = { method: method.toUpperCase(), headers: { 'Content-Type': 'application/json' }, signal };
  if (['POST', 'PUT', 'PATCH' /*, 'DELETE'*/].includes(method.toUpperCase())) {
    req.body = JSON.stringify(body);
  }

  const responseInfo = { done: false };
  const response = await Promise.race([
    fetch(path, req).then((res) => {
      responseInfo.done = true;
      return res.json();
    }),
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ error: `Bad connection ('${path}')` });
        if (!responseInfo.done) {
          controller.abort();
        }
      }, 15000);
    }),
  ]);

  return response;
};

const notify = (response) => events.trigger('notify', response);

const resizeBase64Img = (srcData, width, height) => {
  return new Promise((resolve, reject) => {
    let imageObj = document.createElement('img'),
      canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      xStart = 0,
      yStart = 0,
      aspectRadio,
      newWidth,
      newHeight;

    imageObj.src = srcData;
    canvas.width = width;
    canvas.height = height;

    imageObj.onload = () => {
      aspectRadio = imageObj.height / imageObj.width;

      if (imageObj.height < imageObj.width) {
        //horizontal
        aspectRadio = imageObj.width / imageObj.height;
        newHeight = height;
        newWidth = aspectRadio * height;
        xStart = -(newWidth - width) / 2;
      } else {
        //vertical
        newWidth = width;
        newHeight = aspectRadio * width;
        yStart = -(newHeight - height) / 2;
      }

      ctx.drawImage(imageObj, xStart, yStart, newWidth, newHeight);

      resolve(canvas.toDataURL('image/jpeg', 0.75));
    };
  });
};

const screwEvent = (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.nativeEvent) {
    e.nativeEvent.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    e.nativeEvent.stopPropagation();
  }
};

const getHashFromEv = (e) => {
  const element =
    e.target && e.target.tagName === 'A'
      ? e.target
      : e.target && e.target.parentElement && e.target.parentElement.tagName === 'A'
      ? e.target.parentElement
      : e.target &&
        e.target.parentElement &&
        e.target.parentElement.parentElement &&
        e.target.parentElement.parentElement.tagName === 'A'
      ? e.target.parentElement.parentElement
      : e.currentTarget && e.currentTarget.tagName === 'A'
      ? e.currentTarget
      : e.currentTarget && e.currentTarget.parentElement && e.currentTarget.parentElement.tagName === 'A'
      ? e.currentTarget.parentElement
      : null;

  if (element) {
    return element.hash.substring(1);
  }
};

const onAppScroll = (e) => {
  if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
    events.trigger('scroll-bottom', e.target);
  }
};

export { FieldsObservable, networkCall, notify, resizeBase64Img, screwEvent, getHashFromEv, onAppScroll };
