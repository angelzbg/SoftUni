pirates = (input = []) => {
    return [
        (cities = input
            .slice(0, input.indexOf('Sail'))
            .map((city) => city.split('||'))
            .map((city) => [city[0], ...city.slice(1).map(Number)])
            .reduce(
                (cities, [name, population, gold]) =>
                    Object.assign(cities, {
                        [name]: {
                            population: population + (cities[name] ? cities[name].population : 0),
                            gold: gold + (cities[name] ? cities[name].gold : 0),
                        },
                    }),
                {},
            )),
        (commands = input
            .slice(input.indexOf('Sail') + 1, input.indexOf('End'))
            .map((cmd) => cmd.split('=>'))
            .map((cmd) => [...cmd.slice(0, 2), ...cmd.slice(2).map(Number)])),
    ][1]
        .reduce((output, cmd) => {
            if (cmd[0] === 'Plunder') {
                const city = cities[cmd[1]];
                [city.population, city.gold] = [city.population - cmd[2], city.gold - cmd[3]];
                output.push(`${cmd[1]} plundered! ${cmd[3]} gold stolen, ${cmd[2]} citizens killed.`);
                if (!city.population || !city.gold) {
                    delete cities[cmd[1]];
                    output.push(`${cmd[1]} has been wiped off the map!`);
                }
            } else {
                // 'Prosper'
                if (cmd[2] < 0) {
                    output.push('Gold added cannot be a negative number!');
                } else {
                    cities[cmd[1]].gold += cmd[2];
                    output.push(
                        `${cmd[2]} gold added to the city treasury. ${cmd[1]} now has ${cities[cmd[1]].gold} gold.`,
                    );
                }
            }

            return output;
        }, [])
        .concat(
            !Object.keys(cities).length
                ? '\nAhoy, Captain! All targets have been plundered and destroyed!'
                : [`Ahoy, Captain! There are ${Object.keys(cities).length} wealthy settlements to go to:`].concat(
                      Object.entries(cities)
                          .sort((a, b) => b[1].gold - a[1].gold || a[0].localeCompare(b[0]))
                          .map(
                              ([name, { population, gold }]) =>
                                  `${name} -> Population: ${population} citizens, Gold: ${gold} kg`,
                          ),
                  ),
        )
        .join('\n');
};

console.log(
    pirates([
        'Tortuga||345000||1250',
        'Santo Domingo||240000||630',
        'Havana||410000||1100',
        'Sail',
        'Plunder=>Tortuga=>75000=>380',
        'Prosper=>Santo Domingo=>180',
        'End',
    ]),
);
