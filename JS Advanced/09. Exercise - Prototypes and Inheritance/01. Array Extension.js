(() => {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };

    Array.prototype.skip = function (n = 0) {
        return this.slice(n);
    };

    Array.prototype.take = function (n = 0) {
        return this.slice(0, n);
    };

    Array.prototype.sum = function () {
        return this.reduce((sum, num) => sum + num, 0);
    };

    Array.prototype.average = function () {
        return this.sum() / (this.length || 1);
    };
})();
