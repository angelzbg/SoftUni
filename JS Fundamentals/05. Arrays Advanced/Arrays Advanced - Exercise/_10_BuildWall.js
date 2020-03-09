(params) => {
    params = params.map(Number);

    let dailyUsage = [];

    let isCompleted = false;
    while(!isCompleted) {
        isCompleted = true;
        let crews = 0;

        for (let i = 0; i < params.length; i++) {
            if (params[i] < 30) {
                params[i]++;
                isCompleted = false;
                crews++;
            }
        }

        if (crews > 0) {
            dailyUsage.push(crews * 195);
        }
    }

    console.log(dailyUsage.join(', '));
    console.log(`${ dailyUsage.reduce((a, b) => a + b, 0) * 1900 } pesos`);    
}