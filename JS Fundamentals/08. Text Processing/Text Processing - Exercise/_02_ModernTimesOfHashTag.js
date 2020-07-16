modernWhat = (text = '') => {
    console.log(
        text
            .match(/#[a-zA-Z]+/g)
            .map((w) => w.substr(1))
            .join('\n'),
    );
};
