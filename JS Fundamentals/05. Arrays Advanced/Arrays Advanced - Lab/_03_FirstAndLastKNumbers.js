firstAndLastKNumbers = (arr = []) => {
    let k = arr.shift();
    console.log(`${arr.slice(0, k).join(' ')}\n${arr.slice(arr.length - k).join(' ')}`);
};
