petHouse = () => {
    class Pet {
        constructor(owner, name) {
            [this.owner, this.name, this.comments] = [owner, name, []];
        }

        addComment(comment) {
            if (this.comments.includes(comment)) {
                throw new Error('This comment is already added!');
            }

            return [this.comments.push(comment), 'Comment is added.'].pop();
        }

        feed() {
            return `${this.name} is fed`;
        }

        toString() {
            return `Here is ${this.owner}'s pet ${this.name}.${
                this.comments.length ? `\nSpecial requirements: ${this.comments.join(', ')}` : ''
            }`;
        }
    }

    class Cat extends Pet {
        constructor(owner, name, insideHabits, scratching) {
            super(owner, name);
            [this.insideHabits, this.scratching] = [insideHabits, scratching];
        }

        feed() {
            return `${super.feed()}, happy and purring.`;
        }

        toString() {
            return `${super.toString()}\nMain information:\n${this.name} is a cat with ${this.insideHabits}${
                this.scratching ? ', but beware of scratches.' : ''
            }`;
        }
    }

    class Dog extends Pet {
        constructor(owner, name, runningNeeds, trainability) {
            super(owner, name);
            [this.runningNeeds, this.trainability] = [runningNeeds, trainability];
        }

        feed() {
            return `${super.feed()}, happy and wagging tail.`;
        }

        toString() {
            return `${super.toString()}\nMain information:\n${this.name} is a dog with need of ${
                this.runningNeeds
            }km running every day and ${this.trainability} trainability.`;
        }
    }

    return { Pet, Cat, Dog };
};
