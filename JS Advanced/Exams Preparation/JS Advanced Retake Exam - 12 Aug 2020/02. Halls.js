halls = () => {
  class Hall {
    constructor(capacity, name) {
      Object.assign(this, { capacity, name, events: [] });
    }

    hallEvent(title) {
      if (this.events.includes(title)) {
        throw new Error('This event is already added!');
      } else {
        return [this.events.push(title), 'Event is added.'].pop();
      }
    }

    close() {
      return [(this.events.length = 0), `${this.name} hall is closed.`].pop();
    }

    toString() {
      return `${this.name} hall - ${this.capacity}${this.events.length ? `\nEvents: ${this.events.join(', ')}` : ''}`;
    }
  }

  class MovieTheater extends Hall {
    constructor(capacity, name, screenSize) {
      super(capacity, name);
      this.screenSize = screenSize;
    }

    close() {
      return `${super.close()}Аll screenings are over.`;
    }

    toString() {
      return `${super.toString()}\n${this.name} is a movie theater with ${this.screenSize} screensize and ${
        this.capacity
      } seats capacity.`;
    }
  }

  class ConcertHall extends Hall {
    hallEvent(title, performers) {
      const result = super.hallEvent(title);
      this.performers = performers;
      return result;
    }

    close() {
      this.performers.length = 0;
      return `${super.close()}Аll performances are over.`;
    }

    toString() {
      return `${super.toString()}${this.events.length ? `\nPerformers: ${this.performers.join(', ')}.` : ''}`;
    }
  }

  return { Hall, MovieTheater, ConcertHall };
};
