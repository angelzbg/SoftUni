dungeonestDark = ([dungeon]) => {
    dungeon = dungeon.split('|').map(room => {
        let [ type, value ] = room.split(' ');
        return { type, value: Number(value) };
    });
    let health = 100, coins = 0;
    for(let i = 0; i < dungeon.length; i++) {
        let { type, value } = dungeon[i];
        if(type === 'potion') {
            console.log(`You healed for ${(newHealth = (health + value > 100 ? 100 : health + value)) - health} hp.`);
            console.log(`Current health: ${(health = newHealth)} hp.`);
        } else if(type === 'chest') {
            console.log(`You found ${value} coins.`);
            coins += value;
        } else { // monster
            if((health -= value) > 0) console.log(`You slayed ${type}.`);
            else return console.log(`You died! Killed by ${type}.\nBest room: ${i+1}`);
        }
    }
    console.log(`You've made it!\nCoins: ${coins}\nHealth: ${health}`);
};