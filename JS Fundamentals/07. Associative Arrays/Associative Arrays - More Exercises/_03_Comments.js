comments = (input) => {
    let articles = {}, users = new Set();
    input.forEach(line => {
        if(line.substr(0, 4) === 'user') { // add the user to the list of users
            users.add(line.substr(5));
        } else if(line.substr(0, 7) === 'article') { // add the article to the article list
            articles[line.substr(8)] = [];
        } else { // save the info
            let parts = line.split(': ');
            let [ username, article ] = parts.shift().split(' posts on ');
            if(articles[article] && users.has(username)) {
                let [ title, content ] = parts.shift().split(', ');
                articles[article].push({ title, content, username });
            }
        }
    });

    Object.entries(articles)
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([article, comments]) => {
        console.log(`Comments on ${article}`);

        comments.sort((a, b) => a.username.localeCompare(b.username))
        .forEach(c => {
            console.log(`--- From user ${c.username}: ${c.title} - ${c.content}`);
        });
    });
}

comments(['user aUser123', 'someUser posts on someArticle: NoTitle, stupidComment', 'article Books', 'article Movies', 'article Shopping', 'user someUser', 'user uSeR4', 'user lastUser', 'uSeR4 posts on Books: I like books, I do really like them', 'uSeR4 posts on Movies: I also like movies, I really do', 'someUser posts on Shopping: title, I go shopping every day', 'someUser posts on Movies: Like, I also like movies very much']);