((posts = {}) => {
  const getDo = (url, func) => {
    fetch(`https://cors-anywhere.herokuapp.com/https://blog-apps-c12bf.firebaseio.com/posts/${url}.json`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(res.statusText);
      })
      .then(func)
      .catch((error) => console.error(error.message));
  };

  const elements = [...document.querySelectorAll('h1, button, select, ul')].slice(1);
  const [btnLoad, select, btnView, h1Title, ulBody, ulComments] = elements;

  btnLoad.addEventListener('click', () =>
    getDo(
      '',
      (res) =>
        (select.innerHTML = Object.entries((posts = res)).map(
          ([uuid, { title }]) => `<option value="${uuid}">${title}</option>`
        ))
    )
  );

  btnView.addEventListener('click', () => {
    const post = posts[select.value];
    if (post) {
      getDo(select.value, (res) => { // this data is already present...
        h1Title.textContent = res.title;
        ulBody.innerHTML = res.body; // ooooowkay xD
        ulComments.innerHTML = (res.comments || []).map(({ id, text }) => `<li id="${id}">${text}</li>`).join('');
      });
    }
  });
})();
