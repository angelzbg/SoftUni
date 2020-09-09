inheritingAndReplacingToString = () => {
    class Person {
        constructor(name = '', email = '') {
            [this.name, this.email] = [name, email];
        }

        toString() {
            return `${this.constructor.name} (name: ${this.name}, email: ${this.email})`;
        }
    }

    class Teacher extends Person {
        constructor(name = '', email = '', subject = '') {
            super(name, email);
            this.subject = subject;
        }

        toString() {
            const info = super.toString();
            return `${info.substring(0, info.length - 1)}, subject: ${this.subject})`;
        }
    }

    class Student extends Person {
        constructor(name = '', email = '', course = '') {
            super(name, email);
            this.course = course;
        }

        toString() {
            const info = super.toString();
            return `${info.substring(0, info.length - 1)}, course: ${this.course})`;
        }
    }

    return { Person, Teacher, Student };
};
