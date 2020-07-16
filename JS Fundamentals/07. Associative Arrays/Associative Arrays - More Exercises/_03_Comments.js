comments = (input = []) => {
    let articles = {},
        users = new Set();
    input.forEach((line) => {
        if (line.substr(0, 4) === 'user') {
            // add the user to the list of users
            users.add(line.substr(5));
        } else if (line.substr(0, 7) === 'article') {
            // add the article to the article list
            articles[line.substr(8)] = [];
        } else {
            // save the info
            let parts = line.split(': ');
            let [username, article] = parts.shift().split(' posts on ');

            if (articles[article] && users.has(username)) {
                let [title, content] = parts.shift().split(', ');
                articles[article].push({ title, content, username });
            }
        }
    });

    Object.entries(articles)
        .sort((a, b) => b[1].length - a[1].length)
        .forEach(([article, comments]) => {
            console.log(`Comments on ${article}`);

            comments
                .sort((a, b) => a.username.localeCompare(b.username))
                .forEach((c) => {
                    console.log(`--- From user ${c.username}: ${c.title} - ${c.content}`);
                });
        });
};
