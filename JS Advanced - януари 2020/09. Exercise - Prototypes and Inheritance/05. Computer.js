computerHierarchy = () => {
    class Battery {
        constructor(manufacturer, expectedLife) {
            [this.manufacturer, this.expectedLife] = [manufacturer, expectedLife];
        }
    }

    class Keyboard {
        constructor(manufacturer, responseTime) {
            [this.manufacturer, this.responseTime] = [manufacturer, responseTime];
        }
    }

    class Monitor {
        constructor(manufacturer, width, height) {
            [this.manufacturer, this.width, this.height] = [manufacturer, width, height];
        }
    }

    class Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target === Computer) {
                throw new TypeError();
            }
            [this.manufacturer, this.processorSpeed, this.ram, this.hardDiskSpace] = [
                manufacturer,
                processorSpeed,
                ram,
                hardDiskSpace,
            ];
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            [this.weight, this.color, this.battery] = [weight, color, battery];
        }

        get battery() {
            return this._battery;
        }

        set battery(battery) {
            if (!(battery instanceof Battery)) {
                throw new TypeError();
            }

            this._battery = battery;
        }
    }

    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            [this.keyboard, this.monitor] = [keyboard, monitor];
        }

        get keyboard() {
            return this._keyboard;
        }

        set keyboard(keyboard) {
            if (!(keyboard instanceof Keyboard)) {
                throw new TypeError();
            }

            this._keyboard = keyboard;
        }

        get monitor() {
            return this._monitor;
        }

        set monitor(monitor) {
            if (!(monitor instanceof Monitor)) {
                throw new TypeError();
            }

            this._monitor = monitor;
        }
    }

    return { Battery, Keyboard, Monitor, Computer, Laptop, Desktop };
};
