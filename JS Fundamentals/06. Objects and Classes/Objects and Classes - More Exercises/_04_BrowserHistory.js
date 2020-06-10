browserHistory = (browser, commands) => {
    commands.forEach(line => {
        let cmd = line.split(' ');
        if(cmd[0] === 'Open') {
            browser['Open Tabs'].push(cmd.slice(1).join(' '));
            browser['Browser Logs'].push(line);
        } else if(cmd[0] === 'Close') {
            let tabName = cmd.slice(1).join(' '),
                tabIndex = browser['Open Tabs'].indexOf(tabName);
            if(tabIndex > -1) {
                browser['Open Tabs'].splice(tabIndex, 1);
                browser['Recently Closed'].push(tabName);
                browser['Browser Logs'].push(line);
            }
        } else if(cmd[0] === 'Clear') {
            browser['Open Tabs'] = [];
            browser['Recently Closed'] = [];
            browser['Browser Logs'] = [];
        }
    });

    console.log(browser['Browser Name']);
    console.log(`Open Tabs: ${browser['Open Tabs'].join(', ')}`);
    console.log(`Recently Closed: ${browser['Recently Closed'].join(', ')}`);
    console.log(`Browser Logs: ${browser['Browser Logs'].join(', ')}`);
};