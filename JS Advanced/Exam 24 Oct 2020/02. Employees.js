solve = () => {
  class Developer {
    constructor(firstName, lastName) {
      Object.assign(this, { firstName, lastName, baseSalary: 1000, tasks: [], experience: 0 });
    }

    addTask(id, taskName, priority) {
      this.tasks[priority === 'high' ? 'unshift' : 'push']({ id, taskName, priority });
      return `Task id ${id}, with ${priority} priority, has been added.`;
    }

    doTask() {
      const task = this.tasks.shift();
      if (task) {
        return task.taskName;
      }

      return `${this.firstName}, you have finished all your tasks. You can rest now.`;
    }

    getSalary() {
      return `${this.firstName} ${this.lastName} has a salary of: ${this.baseSalary}`;
    }

    reviewTasks() {
      return `Tasks, that need to be completed:\n${this.tasks
        .map(({ id, taskName, priority }) => `${id}: ${taskName} - ${priority}`)
        .join('\n')}`;
    }
  }

  class Junior extends Developer {
    constructor(firstName, lastName, bonus, experience) {
      super(firstName, lastName);
      Object.assign(this, { baseSalary: 1000 + Number(bonus), experience: Number(experience) });
    }

    learn(years) {
      this.experience += Number(years);
    }
  }

  class Senior extends Developer {
    constructor(firstName, lastName, bonus, experience) {
      super(firstName, lastName);
      Object.assign(this, { baseSalary: 1000 + Number(bonus), experience: Number(experience) + 5 });
    }

    changeTaskPriority(taskId) {
      let taskIndex = this.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        const task = this.tasks.splice(taskIndex, 1)[0];
        if (task.priority === 'high') {
          task.priority = 'low';
          this.tasks.push(task);
        } else {
          task.priority = 'high';
          this.tasks.unshift(task);
        }
        return task;
      }
    }
  }

  return { Developer, Junior, Senior };
};
