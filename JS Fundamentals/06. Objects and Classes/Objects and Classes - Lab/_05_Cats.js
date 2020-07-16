cats = (input = []) => {
    class Cat {
        constructor(name, age) {
            this.name = name;
            this.age = age;
            return this;
        }

        meow() {
            console.log(`${this.name}, age ${this.age} says Meow`);
        }
    }

    input.forEach((el) => {
        let [name, age] = el.split(' ');
        new Cat(name, age).meow();
    });
};
