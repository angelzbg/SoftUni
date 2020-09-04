listProcessor = (cmds = []) => {
    let collection = [];

    const commands = {
        add: (str = '') => collection.push(str),
        remove: (str = '') => (collection = collection.filter((entry) => entry !== str)),
        print: () => console.log(collection.join(',')),
    };

    cmds.map((cmd) => cmd.split(' ')).forEach(([cmd, param]) => commands[cmd](param));
};
