commonElements = (ar1 = [], ar2 = []) => {
    console.log(ar1.filter(value => ar2.indexOf(value) !== -1).join('\n'));
};