import { parseHTMLElement } from '../utils/utils.js';

export default ({ parent }) => {
  const wrapper = parseHTMLElement(
    `<footer>
        <p><a href="https://softuni.bg">Software University</a> - JS Applications @ 2020</p>
    </footer>`
  );
  parent.appendChild(wrapper);

  return {
    wrapper,
    cleanUp: () => {},
  };
};
