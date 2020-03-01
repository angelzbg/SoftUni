(input) => {
    const a = input.slice(1).map( el => { return Number(el) });
    console.log(`Max number: ${Math.max(...a)}\nMin number: ${Math.min(...a)}`);
}