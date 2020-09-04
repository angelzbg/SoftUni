cars = (cmds = []) => {
    const objects = {};

    const getProperties = (obj = {}) =>
        Object.entries(obj).concat(obj.inherit ? getProperties(objects[obj.inherit]) : []);

    const commands = {
        create: (name1, inherit, name2) => {
            objects[name1] = {};
            if (inherit) {
                Object.defineProperty(objects[name1], 'inherit', { value: name2 });
            }
        },
        set: (name, prop, val) => (objects[name][prop] = val),
        print: (name) =>
            console.log(
                getProperties(objects[name])
                    .map(([key, value]) => `${key}:${value}`)
                    .join(', '),
            ),
    };

    cmds.map((cmd) => cmd.split(' ')).forEach(([cmd, ...args]) => commands[cmd](...args));
};
