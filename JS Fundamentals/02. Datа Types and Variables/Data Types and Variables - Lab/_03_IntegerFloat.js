(n1, n2, n3) => {
    let sum = n1+n2+n3;
    if(sum % 1 == 0) sum += ' - Integer';
    else sum += ' - Float';
    console.log(sum);
}