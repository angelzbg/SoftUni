solve = () => {
    const cart = { products: new Set(), price: 0 };
    const textarea = document.getElementsByTagName('textarea')[0];

    const addToCart = (product, price) => {
        cart.products.add(product);
        cart.price += price;
        textarea.value += `Added ${product} for ${price.toFixed(2)} to the cart.\n`;
    };

    const onClickAddToCart = (name, price) => {
        addToCart(name, price);
    };

    const eventCleaner = [];

    let products = document.getElementsByClassName('product');
    Array.from(products).forEach((product) => {
        const name = product.getElementsByClassName('product-title')[0].textContent;
        const price = Number(product.getElementsByClassName('product-line-price')[0].textContent);
        const buttonAdd = product.getElementsByTagName('button')[0];
        buttonAdd.addEventListener('click', (addClick = () => onClickAddToCart(name, price)));
        eventCleaner.push({ element: buttonAdd, type: 'click', func: addClick });
    });

    const checkout = document.getElementsByClassName('checkout')[0];
    checkout.addEventListener(
        'click',
        (checkOut = () => {
            textarea.value += `You bought ${[...cart.products].join(', ')} for ${cart.price.toFixed(2)}.`;
            checkout.removeEventListener('click', checkOut);
            eventCleaner.forEach((el) => el.element.removeEventListener(el.type, el.func));
        }),
    );
};
