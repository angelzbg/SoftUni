export const isValidEmail = (emailString) =>
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    emailString
  );

export const parseHTMLElement = (htmlString) =>
  new DOMParser().parseFromString(htmlString, 'text/html').firstChild.lastChild.firstChild;

export const parseHTMLElements = (...htmlStrings) => htmlStrings.map(parseHTMLElement);
