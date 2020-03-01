(input) => {
    const city = input.shift().toLowerCase();
    const sales = Number(input.shift());
    let comission = -1;

    if(city === 'sofia') {
        if(sales > -1 && sales <= 500) comission = sales*0.05;
        else if(sales <= 1000) comission = sales*0.07;
        else if(sales <= 10000) comission = sales*0.08;
        else if(sales > 10000) comission = sales*0.12;
    } else if(city === 'varna') {
        if(sales > -1 && sales <= 500) comission = sales*0.045;
        else if(sales <= 1000) comission = sales*0.075;
        else if(sales <= 10000) comission = sales*0.1;
        else if(sales > 10000) comission = sales*0.13;
    } else if(city === 'plovdiv') {
        if(sales > -1 && sales <= 500) comission = sales*0.055;
        else if(sales <= 1000) comission = sales*0.08;
        else if(sales <= 10000) comission = sales*0.12;
        else if(sales > 10000) comission = sales*0.145;
    }

    console.log(comission > -1 ? comission.toFixed(2) : 'error');
}