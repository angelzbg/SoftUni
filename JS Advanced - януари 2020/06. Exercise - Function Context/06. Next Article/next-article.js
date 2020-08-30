getArticleGenerator = (
    articles,
    [currentArticle, maxArticle, content] = [-1, articles.length - 1, document.getElementById('content')],
) => () =>
    ++currentArticle <= maxArticle
        ? content.insertAdjacentHTML('beforeend', `<article>${articles[currentArticle]}</article>`)
        : null;
// ne kopirai, che na 100% ne znaesh kvo sum pisal, ama naistina
