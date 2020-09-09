sum = () => {
    let selector1, selector2, resultSelector;
    return {
        init: (...args) => ([selector1, selector2, resultSelector] = args.map((s) => document.querySelector(s))),
        add: () => (resultSelector.value = +selector1.value + +selector2.value),
        subtract: () => (resultSelector.value = +selector1.value - +selector2.value),
    };
};
