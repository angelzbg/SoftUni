people = () => {
    class Employee {
        constructor(name, age) {
            if (new.target === Employee) {
                throw new Error('Cannot make instance of abstract class Employee.');
            }

            [this.name, this.age, this.salary, this.tasks] = [name, age, 0, []];
        }

        work = () => {
            let current = this.tasks.shift();
            console.log(`${this.name} ${current}`);
            this.tasks.push(current);
        };

        getSalary() {
            return this.salary;
        }

        collectSalary = () => console.log(`${this.name} received ${this.getSalary()} this month.`);
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = ['is working on a simple task.'];
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = [
                'is working on a complicated task.',
                'is taking time off work.',
                'is supervising junior workers.',
            ];
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.dividend = 0;
            this.tasks = ['scheduled a meeting.', 'is preparing a quarterly report.'];
        }

        getSalary = () => super.getSalary() + this.dividend;
    }

    return { Employee, Junior, Senior, Manager };
};
