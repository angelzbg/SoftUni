(input) => {
    let dungeon = input.shift().split('|');
    let health = 100, coins = 0;
    for(let i=0; i<dungeon.length; i++) {
        let action = dungeon[i].split(' ');
        let type = action[0], value = Number(action[1]);
        if(type === 'potion') {
            let newHealth = (health + value > 100 ? 100 : health + value);
            console.log(`You healed for ${newHealth-health} hp.`);
            health = newHealth;
            console.log(`Current health: ${health} hp.`);
        } else if(type === 'chest') {
            console.log(`You found ${value} coins.`);
            coins += value;
        } else { // monster
            health -= value;
            if(health > 0) console.log(`You slayed ${type}.`);
            else return console.log(`You died! Killed by ${type}.\nBest room: ${i+1}`);
        }
    }
    console.log(`You've made it!\nCoins: ${coins}\nHealth: ${health}`);
}