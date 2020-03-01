(input) => {
    const text = input.shift(), len = text.length;
    for(let i=0; i<len; i++) {
        console.log(text.charAt(i));
    }
}