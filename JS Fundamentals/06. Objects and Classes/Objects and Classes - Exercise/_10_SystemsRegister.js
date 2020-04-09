systemsRegister = (input) => {
    let DB = {};

    input.forEach(l => {
        let [ system, component, subcomponent ] = l.split(' | ');

        if(DB[system]) {
            if(DB[system][component]) {
                DB[system][component].push(subcomponent);
            } else {
                DB[system][component] = [ subcomponent ];
            }
        } else {
            DB[system] = {};
            DB[system][component] = [ subcomponent ];
        }
    });

    Object.keys(DB).sort((sys1, sys2) => Object.keys(DB[sys2]).length - Object.keys(DB[sys1]).length || sys1.toLowerCase().localeCompare(sys2.toLowerCase())).forEach(sysKey => {
        console.log(sysKey);
        Object.keys(DB[sysKey]).sort((a, b) => DB[sysKey][b].length - DB[sysKey][a].length).forEach(compKey => {
            console.log(`|||${compKey}`);
            DB[sysKey][compKey].forEach(subcomp => console.log(`||||||${subcomp}`));
        });
    });
}