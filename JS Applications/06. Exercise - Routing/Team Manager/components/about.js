import { parseHTMLElement } from '../scripts/utils.js';

export default ({ parent }) => {
  const child = parseHTMLElement('<h1>About Page</h1>');
  parent.appendChild(child);
  return () => parent.removeChild(child);
};
