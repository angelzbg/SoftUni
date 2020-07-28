modernWhat = (text = '') => text.match(/#[a-zA-Z]+/g).map((w) => w.substr(1)).join('\n');
