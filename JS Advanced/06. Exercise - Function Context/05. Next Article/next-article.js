getArticleGenerator = (
    articles,
    [currentArticle, maxArticle, content] = [-1, articles.length - 1, document.getElementById('content')],
) => () =>
    ++currentArticle <= maxArticle
        ? content.insertAdjacentHTML('beforeend', `<article>${articles[currentArticle]}</article>`)
        : null;
