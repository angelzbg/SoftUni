class Company {
    constructor() {
        this.departments = [];
    }

    addEmployee = (username, salary, position, department) => {
        for (let arg of [username, salary, position, department]) {
            if (!arg) {
                throw new Error('Invalid input!');
            }
        }

        if (salary < 0) {
            throw new Error('Invalid input!');
        }

        this.departments.push({ username, salary, position, department });
        return `New employee is hired. Name: ${username}. Position: ${position}`;
    };

    bestDepartment = () => {
        const departments = {};
        const salaries = {};
        this.departments.forEach((employee) => {
            salaries[employee.department] = employee.salary + (salaries[employee.department] || 0);
            departments[employee.department] = (departments[employee.department] || []).concat(employee);
        });

        const bestDepartment = Object.entries(
            Object.entries(salaries).reduce(
                (_departments, [department, salary]) =>
                    Object.assign(_departments, { [department]: salary / departments[department].length }),
                {},
            ),
        ).sort((a, b) => b[1] - a[1])[0];

        const employees = departments[bestDepartment[0]]
            .sort((a, b) => b.salary - a.salary || a.username.localeCompare(b.username))
            .map(({ username, salary, position }) => `${username} ${salary} ${position}`)
            .join('\n');

        return `Best Department is: ${bestDepartment[0]}\nAverage salary: ${bestDepartment[1].toFixed(2)}\n${employees}`;
    };
}
