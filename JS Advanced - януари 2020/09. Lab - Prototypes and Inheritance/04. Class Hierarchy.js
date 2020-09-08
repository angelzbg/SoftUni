classHierarchy = () => {
    class Figure {
        constructor(units = 'cm') {
            this.units = units;
        }

        changeUnits = (units = '') => (this.units = units);

        get area() {
            const values = { mm: 1, cm: 10, m: 1000 };

            return Object.fromEntries(
                Object.entries({ width: this.width, height: this.height, radius: this.radius })
                    .filter(([key, value]) => value !== undefined)
                    .map(([key, value]) => [[key], (values.cm * value) / values[this.units]]),
            );
        }
    }

    class Circle extends Figure {
        constructor(radius = 0, units) {
            super(units);
            this.radius = radius;
        }

        get area() {
            const { radius } = super.area;
            return Math.PI * radius ** 2;
        }

        toString() {
            const { radius } = super.area;
            return `Figures units: ${this.units} Area: ${this.area} - radius: ${radius}`;
        }
    }

    class Rectangle extends Figure {
        constructor(width = 0, height = 0, units) {
            super(units);
            [this.width, this.height] = [width, height];
        }

        get area() {
            const { width, height } = super.area;
            return width * height;
        }

        toString() {
            const { width, height } = super.area;
            return `Figures units: ${this.units} Area: ${this.area} - width: ${width}, height: ${height}`;
        }
    }

    return { Figure, Rectangle, Circle };
};
