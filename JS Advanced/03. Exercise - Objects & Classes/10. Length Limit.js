function Stringer(text, length) {
    this.innerString = text;
    this.innerLength = length;

    this.decrease = (length) => {
        this.innerLength = this.innerLength - length < 0 ? 0 : this.innerLength - length;
    };

    this.increase = (length) => {
        this.innerLength += length;
    };

    this.toString = () => {
        return `${this.innerString.substr(0, this.innerLength)}${this.innerString.length > this.innerLength ? '...' : ''}`;
    };

    return this;
}
