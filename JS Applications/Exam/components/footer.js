import { parseHTMLElement } from '../utils/utils.js';

export default ({ parent }) => {
  return { wrapper: parent.appendChild(parseHTMLElement(`<footer>@SoftUni Destinations 2020</footer>`)) };
};
