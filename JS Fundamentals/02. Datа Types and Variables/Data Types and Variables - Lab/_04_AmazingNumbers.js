amazingNumbers = (num) => {
    console.log(`${num} Amazing? ${num.toString().split('').map(Number).reduce((a, b) => a + b, 0).toString().includes('9') ? 'True' : 'False'}`);
}