(input) => {
    const fruits = [ 'banana', 'apple', 'kiwi', 'cherry', 'lemon', 'grapes' ];
    const vegetables = [ 'tomato', 'cucumber', 'pepper', 'carrot' ];
    const thing = input.shift();
    
    console.log(fruits.indexOf(thing) > -1 ? 'fruit' : vegetables.indexOf(thing) > -1 ? 'vegetable' : 'unknown');
}