addAndRemoveElements = (cmds = []) => {
    const result = [];
    cmds.forEach((cmd, idx) => result[cmd === 'add' ? 'push' : 'pop'](idx + 1));

    return result.length ? result.join('\n') : 'Empty';
};
