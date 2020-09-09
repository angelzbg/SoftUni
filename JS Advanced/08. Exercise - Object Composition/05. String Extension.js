(() => {
    String.prototype.ensureStart = function (str = '') {
        if (!this.startsWith(str)) {
            return str + this;
        }

        return this.toString();
    };

    String.prototype.ensureEnd = function (str = '') {
        if (!this.endsWith(str)) {
            return this + str;
        }

        return this.toString();
    };

    String.prototype.isEmpty = function () {
        return !this.length;
    };

    String.prototype.truncate = function (n = 0) {
        if (n < 4) {
            return '.'.repeat(n);
        }

        if (this.length <= n) {
            return this.toString();
        }

        const foundSpaceIndex = this.substring(0, n - 2).lastIndexOf(' ');

        if (foundSpaceIndex !== -1) {
            return this.substring(0, foundSpaceIndex) + '.'.repeat(3);
        } else {
            return this.substring(0, n - 2) + '.'.repeat(3);
        }
    };

    String.format = (string = '', ...params) => {
        params.forEach((word, index) => {
            string = string.replace(`{${index}}`, word);
        });

        return string;
    };
})();
