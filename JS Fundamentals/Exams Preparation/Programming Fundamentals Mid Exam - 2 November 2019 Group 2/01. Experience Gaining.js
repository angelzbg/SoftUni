experienceGaming = (input = []) => {
    input = input.map(Number);
    const [neededXP, countOfBattles] = input.splice(0, 2);

    let totalXP = 0;
    
    for(let i = 1; i <= countOfBattles; i++) {
        let [battleXP, isThird, isFifth] = [input.shift(), i % 3 === 0, i % 5 === 0];
        
        totalXP +=
            isThird && isFifth ?
                battleXP * 1.05
            : isThird ?
                battleXP * 1.15
            : isFifth ?
                battleXP * .9
            : battleXP;

        if(totalXP >= neededXP) {
            return `Player successfully collected his needed experience for ${i} battles.`
        }
    }

    return `Player was not able to collect the needed experience, ${(neededXP - totalXP).toFixed(2)} more needed.`;
};

console.log(experienceGaming([
    '400', '5',
    '50',  '100',
    '200', '100',
    '20'
  ]));