(input) => {
    let perMonth = Number(input.shift()),
        months = Number(input.shift()),
        personal = Number(input.shift());
    
    let savings = perMonth - perMonth*0.3 - personal;

    let savedTotal = months * savings;

    let percent = 100/perMonth*savings;

    console.log(`She can save ${percent.toFixed(2)}%\n${savedTotal.toFixed(2)}`);
}