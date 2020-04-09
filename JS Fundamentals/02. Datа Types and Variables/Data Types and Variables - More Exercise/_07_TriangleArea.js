triangleArea = (a, b, c) => {
    let s = (a+b+c)/2;
    console.log( Math.sqrt(s*(s-a)*(s-b)*(s-c)) );
}