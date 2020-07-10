createArticle = () => {
	const title = document.getElementById('createTitle');
	const content = document.getElementById('createContent');
	if(!title.value || !content.value) {
		return;
	}

	document.getElementById('articles').insertAdjacentHTML(
		'beforeend',
		'<article>' +
			`<h3>${title.value}</h3>` +
			`<p>${content.value}</p>` +
		'</article>'
	);

	[title.value, content.value] = ['', ''];
};