(input) => {
    let list = [];
    const indexFinish = input.lastIndexOf('Finish');
    input.slice(1, indexFinish).forEach(l => {
        if(isNaN(l)) {
            list.push({
                name: l,
                sum: 0,
                count: 0
            });
        } else {
            let obj = list[list.length-1]
            obj.sum += Number(l);
            obj.count++;
        }
    });
    let totalSum = 0, average = 0;
    list.forEach(o => {
        average = o.sum/o.count;
        totalSum += average;
        console.log(`${o.name} - ${average.toFixed(2)}.`);
    });
    console.log(`Student's final assessment is ${(totalSum/list.length).toFixed(2)}.`);
}