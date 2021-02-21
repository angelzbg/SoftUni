const notFound = ({ user, data, error, path }) => {
  return `
    <img src="${path}images/sadFace.png" alt="sad-face" class="sad-face">
    <h1 class="not-found">404 - Page Not Found</h1>`;
};

module.exports = notFound;
