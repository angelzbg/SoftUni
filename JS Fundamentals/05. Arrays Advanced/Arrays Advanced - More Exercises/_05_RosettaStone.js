rosettaStone = (input) => {
    let n = Number(input.shift());
    let templateMatrix = input.splice(0, n).map(row => row.split(' ').map(Number));
    let encodedMatrix = input.map(row => row.split(' ').map(Number));

    for(let i=0; i<encodedMatrix.length; i++){
        for(let j=0; j<encodedMatrix[i].length; j++){
            encodedMatrix[i][j] += templateMatrix[i%templateMatrix.length][j%templateMatrix[0].length];
            encodedMatrix[i][j] %= 27;

            if(encodedMatrix[i][j] == 0) encodedMatrix[i][j] = " ";
            else encodedMatrix[i][j] = String.fromCharCode(64 + encodedMatrix[i][j]);
        }
    }

    let encodedMessage = "";
    encodedMatrix.forEach(row => encodedMessage += row.join(''));
    console.log(encodedMessage.trim());
}