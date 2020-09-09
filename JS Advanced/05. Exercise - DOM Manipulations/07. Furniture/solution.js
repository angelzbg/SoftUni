solve = () => {
    const [furnitureInput, furnitureOutput] = document.querySelectorAll('textarea');
    const table = document.querySelectorAll('tbody')[0];

    document.querySelectorAll('button')[0].addEventListener('click', () => {
        const input = JSON.parse(furnitureInput.value);

        input.forEach((el) => {
            const productRowString =
                '<tr>' +
                `<td><img src="${el.img}"></td>` +
                `<td><p>${el.name}</p></td>` +
                `<td><p>${el.price}</p></td>` +
                `<td><p>${el.decFactor}</p></td>` +
                `<td><input type="checkbox" /></td>` +
                '</tr>';
            table.insertAdjacentHTML('beforeEnd', productRowString);
        });

        furnitureInput.value = '';
    });

    document.querySelectorAll('button')[1].addEventListener('click', () => {
        const [products, prices, factors] = [[], [], []];
        for (row of table.querySelectorAll('tr')) {
            if (row.querySelectorAll('input')[0].checked) {
                const productInfo = row.querySelectorAll('p');
                products.push(productInfo[0].textContent);
                prices.push(+productInfo[1].textContent);
                factors.push(+productInfo[2].textContent);
            }
        }

        const output = [
            'Bought furniture: ' + products.join(', '),
            'Total price: ' + prices.reduce((sum, num) => sum + num, 0).toFixed(2),
            'Average decoration factor: ' + factors.reduce((sum, num) => sum + num, 0) / (factors.length || 1),
        ];

        furnitureOutput.value = output.join('\n');
    });
};
