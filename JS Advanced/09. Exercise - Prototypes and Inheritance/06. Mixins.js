createMixins = () => ({
    computerQualityMixin: (toExtend) => {
        toExtend.prototype.getQuality = function () {
            return (this.processorSpeed + this.ram + this.hardDiskSpace) / 3;
        };

        toExtend.prototype.isFast = function () {
            return this.processorSpeed > this.ram / 4;
        };

        toExtend.prototype.isRoomy = function () {
            return this.hardDiskSpace > Math.floor(this.ram * this.processorSpeed);
        };
    },
    styleMixin: (toExtend) => {
        toExtend.prototype.isFullSet = function () {
            return new Set([this.manufacturer, this.keyboard.manufacturer, this.monitor.manufacturer]).size === 1;
        };

        toExtend.prototype.isClassy = function () {
            return this.battery.expectedLife >= 2 && ['Silver', 'Black'].includes(this.color) && this.weight < 3;
        };
    },
});
