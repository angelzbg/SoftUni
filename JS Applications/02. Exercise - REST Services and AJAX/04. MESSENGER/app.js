((url = 'https://rest-messanger.firebaseio.com/messanger.json') => {
  const toJson = (res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error(res.statusText);
  };

  const elements = ['messages', 'author', 'content', 'submit', 'refresh'].map((id) => document.getElementById(id));
  const [textarea, nameIn, messageIn, submit, refresh] = elements;

  const render = (data) => {
    textarea.value = Object.values(data)
      .map(({ author, content }) => `${author}: ${content}`)
      .join('\n');
    textarea.scrollTo({ top: textarea.scrollHeight, behavior: 'smooth' });
  };

  const loadData = () => {
    fetch(url)
      .then(toJson)
      .then(render)
      .catch((e) => console.error(e.message));
  };

  const sendMessage = (data) => {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    })
      .then(() => {
        loadData();
        messageIn.value = '';
        messageIn.focus();
      })
      .catch((e) => console.error(e.message));
  };

  refresh.addEventListener('click', loadData);

  submit.addEventListener('click', () => {
    const [author, content] = [nameIn, messageIn].map((el) => el.value.trim());
    if (author && content) {
      sendMessage({ author, content });
    }
  });

  messageIn.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      submit.click();
    }
  });

  refresh.click();
})();
