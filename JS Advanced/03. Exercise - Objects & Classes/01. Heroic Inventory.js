heroicInventory = (data = []) => {
    return JSON.stringify(
        data.reduce((heroes, heroStr) => {
            let [name, level, items] = heroStr.split(' / ');
            heroes.push({
                name,
                level: Number(level),
                items: items ? items.split(', ') : [],
            });
            return heroes;
        }, []),
    );
};
