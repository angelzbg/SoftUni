mergeArrays = (ar1 = [], ar2 = []) => {
    let ar3 = [], len = ar1.length;
    for(let i = 0; i < len; i++) {
        if(i % 2 == 0) ar3.push(Number(ar1[i]) + Number(ar2[i]));
        else ar3.push(ar1[i] + ar2[i]);
    }
    
    console.log(ar3.join(' - '));
};