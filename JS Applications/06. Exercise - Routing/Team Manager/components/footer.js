import { parseHTMLElement } from '../scripts/utils.js';

export default ({ parent }) => {
  parent.appendChild(parseHTMLElement('<footer>Team Manager SPA &copy; 2017</footer>'));
};
