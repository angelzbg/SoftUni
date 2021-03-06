inventory = (heroes = []) => {
    heroes
        .map((h) => {
            let [name, level, items] = h.split(' / ');
            level = Number(level);
            items = items.split(', ').sort().join(', ');
            return { name, level, items };
        })
        .sort((h1, h2) => h1.level - h2.level)
        .forEach((h) => console.log(`Hero: ${h.name}\nlevel => ${h.level}\nitems => ${h.items}`));
};
