(num) => {
    let isAmazing = (num) => {

        let numStr = num + '';
        let sum = 0;
        for(let i=0; i<numStr.length; i++) {
            sum += Number(numStr[i]);
        }
        sum += '';
        return sum.includes('9') ? 'True' : 'False';
    }

    console.log(`${num} Amazing? ${isAmazing(num)}`);
}