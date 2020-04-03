legendary = (input) => {
    let materials = {},
        required = {
            fragments: 'Valanyr',
            shards: 'Shadowmourne',
            motes: 'Dragonwrath'
        },
        goal = 250;

    input = input.split(' ');
    for(let i=0; i<input.length; i+=2) {
        let value = Number(input[i]), mat = input[i+1].toLowerCase();

        materials[mat] = value + (materials[mat] || 0);
        if(required[mat] && materials[mat] >= goal) {
            materials[mat] -= goal;
            console.log(`${required[mat]} obtained!`);
            break;
        }
    }

    for(matKey in required) {
        required[matKey] = materials[matKey] || 0;
        delete materials[matKey];
    }

    Object
    .entries(required)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });

    Object
    .entries(materials)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
}

legendary('3 Motes 5 stones 5 Shards 6 leathers 255 fragments 7 Shards');
console.log('-----');
legendary('123 silver 6 shards 8 shards 5 motes 9 fangs 75 motes 103 MOTES 8 Shards 86 Motes 7 stones 19 silver');