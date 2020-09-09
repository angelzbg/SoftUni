extensibleObject = () => ({
    __proto__: {},
    extend: function (template) {
        Object.entries(template).forEach(([key, value]) => {
            if (typeof value === 'function') {
                this.__proto__[key] = value;
            } else {
                this[key] = value;
            }
        });
    },
});
