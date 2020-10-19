petHouse = () => {
  class Pet {
    constructor(owner, name) {
      Object.assign(this, { owner, name, comments: [] });
    }

    addComment(comment) {
      if (this.comments.indexOf(comment) !== -1) {
        throw new Error('This comment is already added!');
      }

      this.comments.push(comment);
      return 'Comment is added.';
    }

    feed() {
      return `${this.name} is fed`;
    }

    toString() {
      return (
        `Here is ${this.owner}'s pet ${this.name}.` +
        (this.comments.length ? `\nSpecial requirements: ${this.comments.join(', ')}` : '')
      );
    }
  }

  class Cat extends Pet {
    constructor(owner, name, insideHabits, scratching) {
      super(owner, name);
      Object.assign(this, { insideHabits, scratching });
    }

    feed = () => {
      return super.feed() + `, happy and purring.`;
    };

    toString = () => {
      return (
        super.toString() +
        `\nMain information:\n${this.name} is a cat with ${this.insideHabits}` +
        (this.scratching ? ', but beware of scratches.' : '')
      );
    };
  }

  class Dog extends Pet {
    constructor(owner, name, runningNeeds, trainability) {
      super(owner, name);
      Object.assign(this, { runningNeeds, trainability });
    }

    feed = () => {
      return super.feed() + ', happy and wagging tail.';
    };

    toString = () => {
      return (
        super.toString() +
        `\nMain information:\n${this.name} is a dog with need of ${this.runningNeeds}km running every day and ${this.trainability} trainability.`
      );
    };
  }

  return { Pet, Cat, Dog };
};
