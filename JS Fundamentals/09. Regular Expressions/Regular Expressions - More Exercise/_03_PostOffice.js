postOffice = ([input = '']) => {
    input = input.split('|');
    let firstPart = input[0], secondPart = input[1], thirdPart = input[2];

    firstPart.match(/([#$%*&])(?<capitals>[A-Z]+)(\1)/).groups.capitals.split('').forEach(ch => {
        let ASCIIcode = ch.charCodeAt(0);
        let len = Number(secondPart.match(new RegExp(`${ASCIIcode}:(?<len>[0-9][0-9])`)).groups.len);
        let word = thirdPart.match(new RegExp(`(?<=\\s|^)${ch}[^\\s]{${len}}(?=\\s|$)`, 'g'))[0];
        console.log(word);
    });
};