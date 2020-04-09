sortNumbers = (n1, n2, n3) => {
    console.log([ n1, n2, n3 ].sort( (a,b) => b - a ).join('\n'));
}