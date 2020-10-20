halls = () => {
  class Hall {
    constructor(capacity, name) {
      Object.assign(this, { capacity, name, events: [] });
    }

    hallEvent(title) {
      if (this.events.includes(title)) {
        throw new Error('This event is already added!');
      }

      this.events.push(title);
      return 'Event is added.';
    }

    close() {
      this.events.length = 0;
      return `${this.name} hall is closed.`;
    }

    toString() {
      return `${this.name} hall - ${this.capacity}${this.events.length ? `Events: ${this.events.join(', ')}` : ''}`;
    }
  }

  class MovieTheater extends Hall {
    constructor(capacity, name, screenSize) {
      super(capacity, name);
      Object.assign(this, { screenSize });
    }

    close = () => `${super.close()}Аll screenings are over.`;

    toString = () =>
      `${super.toString()}\n${this.name} is a movie theater with ${this.screenSize} screensize and ${
        this.capacity
      } seats capacity.`;
  }

  class ConcertHall extends Hall {
    hallEvent = (title, performers) => {
      const res = super.hallEvent(title);
      this.performers = performers;
      return res;
    };

    close = () => `${super.close()}Аll performances are over.`;

    toString = () => `${super.toString()}${this.events.length ? `\nPerformers: ${this.performers.join(', ')}.` : ''}`;
  }

  return { Hall, MovieTheater, ConcertHall };
};
