autoEngineeringCompany = (data = []) => {
    return Object
        .entries(data.reduce((brands, str) => {
            let[brand, model, count] = str.split(' | ');
            if(!brands[brand]) {
                brands[brand] = {};
            }

            brands[brand][model] = Number(count) + (brands[brand][model] || 0);
            return brands;
        }, {}))
        .map(([brand, models]) => {
            let modelsOutput = Object
                .entries(models).map(([model, count]) => `###${model} -> ${count}`)
                .join('\n');
            return `${brand}\n${modelsOutput}`;
        })
        .join('\n');
};