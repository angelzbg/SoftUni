systemComponents = (data = []) => {
    return Object.entries(
        data.reduce((systems, str) => {
            let [system, component, subcomponent] = str.split(' | ');
            if (!systems[system]) {
                Object.assign(systems, { [system]: { [component]: [subcomponent] } });
            } else {
                systems[system][component] = (systems[system][component] || []).concat(subcomponent);
            }

            return systems;
        }, {}),
    )
        .sort((a, b) => Object.keys(b[1]).length - Object.keys(a[1]).length || a[0].localeCompare(b[0]))
        .map(([system, components]) => {
            let componentsOutput = Object.entries(components)
                .sort((a, b) => Object.keys(b[1]).length - Object.keys(a[1]).length)
                .map(([component, subcomponents]) => {
                    return `|||${component}\n||||||${subcomponents.join('\n||||||')}`;
                })
                .join('\n');

            return `${system}\n${componentsOutput}`;
        })
        .join('\n');
};
