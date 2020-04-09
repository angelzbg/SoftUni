postOffice = ([input]) => {
    input = input.split('|');
    let firstPart = input[0], secondPart = input[1], thirdPart = input[2];

    firstPart.match(/([#$%*&])(?<capitals>[A-Z]+)(\1)/).groups.capitals.split('').forEach(ch => {
        let ASCIIcode = ch.charCodeAt(0);
        let len = Number(secondPart.match(new RegExp(`${ASCIIcode}:(?<len>[0-9][0-9])`)).groups.len);
        let word = thirdPart.match(new RegExp(`(?<=\\s|^)${ch}[^\\s]{${len}}(?=\\s|$)`, 'g'))[0];
        console.log(word);
    });
}

postOffice(['sdsGGasAOTPWEEEdas$AOTP$|a65:1.2s65:03d79:01ds84:02! -80:07++ABs90:1.1|adsaArmyd Gara So La Arm Armyw21 Argo O daOfa Or Ti Sar saTheww The Parahaos']);