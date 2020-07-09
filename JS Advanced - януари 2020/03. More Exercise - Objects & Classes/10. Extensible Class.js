(() => {
    class Extensible {
        static id = 0;

        constructor() {
            this.id = Extensible.id++;
        }
    }

    Extensible.prototype.extend = function (template) {
        Object.entries(template).forEach(([key, value]) => {
            this.__proto__[key] = value;
            this[key] = value;
        });
    };

    return Extensible;
})();
