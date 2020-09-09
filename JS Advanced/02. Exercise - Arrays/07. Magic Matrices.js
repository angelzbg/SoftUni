/**
 * Note: Solution #1 is much much faster in the worst case scenario -> true
 * and MUCH MUCH MUCH FASTER in the best case scenario -> false
 */

// Solution #1 - row by row and col by col
magicMatrices1 = (matrix = []) => {
    const N = matrix.length;

    let rowSum = matrix[0].reduce((a, b) => a + b, 0);

    for(let i = 1; i < N; i++) {
        let currentRowSum = 0;
        for(let j = 0; j < N; j++) {
            currentRowSum += matrix[i][j];
        }

        if(currentRowSum !== rowSum) {
            return false;
        }
    }

    for(let i = 0; i < N; i++) {
        let colSum = 0;
        for(let j = 0; j < N; j++) {
            colSum += matrix[j][i];
        }

        if(colSum !== rowSum) {
            return false;
        }
    }

    return true;
};

// Solution #2 - all rows and all cols -> then full check sum by sum
magicMatrices2 = (matrix = []) => {
    const N = matrix.length;

    const sums = [new Array(N).fill(0), new Array(N).fill(0)];

    for(let i = 0; i < N; i++) {
        for(let j = 0; j < N; j++) {
            sums[0][i] += matrix[i][j];
            sums[1][j] += matrix[j][i];
        }
    }

    for(let i = 0; i < 2; i++) {
        for(let j = 0; j < N; j++) {
            if(sums[i][j] !== sums[0][0]) {
                return false;
            }
        }
    }

    return true;
};

/**
 * true
 * true
 * don't mind me: 46192.823ms
 * true
 * test1: 15805.907ms
 * true
 * test2: 32243.004ms
 */
const N = 15000;
let matrix = new Array(N);
for(let i = 0; i < N; i++) {
    matrix[i] = new Array(N).fill(1);
}
// matrix[0][1] = 0;
// false
// false
// don't mind me: 30526.394ms
// false
// test1: 3.042ms
// false
// test2: 31248.469ms


console.time('don\'t mind me');
console.log(magicMatrices1(matrix));
console.log(magicMatrices2(matrix));
console.timeEnd('don\'t mind me');


console.time('test1');
console.log(magicMatrices1(matrix));
console.timeEnd('test1');

console.time('test2');
console.log(magicMatrices2(matrix));
console.timeEnd('test2');
//*/