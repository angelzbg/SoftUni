import { parseHTMLElement } from '../utils/utils.js';

export default ({ parent }) => {
  const wrapper = parent.appendChild(
    parseHTMLElement(
      `<footer class="page-footer font-small">
        <div class="footer-copyright text-center py-3">© 2020
            <a href="https://softuni.bg/trainings/2840/js-applications-june-2020/internal" class="text-dark">JS Applications</a>
        </div>
      </footer>`
    )
  );

  return {
    wrapper,
    cleanUp: () => {},
  };
};
