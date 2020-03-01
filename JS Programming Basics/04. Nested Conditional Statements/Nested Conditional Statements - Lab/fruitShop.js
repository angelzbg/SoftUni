(input) => {
    const prices = {
        'banana': [ 2.5, 2.7 ],
        'apple': [ 1.2, 1.25 ],
        'orange': [ 0.85, 0.9 ],
        'grapefruit': [ 1.45, 1.6 ],
        'kiwi': [ 2.7, 3 ],
        'pineapple': [ 5.5, 5.6 ],
        'grapes': [ 3.85, 4.2 ]
    };

    const days = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ];

    const fruit = input.shift().toLowerCase();
    const day = input.shift().toLowerCase();
    const quantity = Number(input.shift());

    if(prices[fruit] !== undefined && days.indexOf(day) > -1) {
        console.log((quantity * (day === 'saturday' || day === 'sunday' ? prices[fruit][1] : prices[fruit][0])).toFixed(2));
    } else console.log('error');
}