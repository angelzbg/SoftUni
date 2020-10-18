pressHouse = () => {
  class Article {
    constructor(title, content) {
      Object.assign(this, { title, content });
    }

    toString() {
      return `Title: ${this.title}\nContent: ${this.content}`;
    }
  }

  class ShortReports extends Article {
    constructor(title, content, originalResearches, comments = []) {
      super(title, content);
      if (content.length > 150) {
        throw new Error('Short reports content should be less then 150 symbols.');
      } else if (!originalResearches.author || !originalResearches.title) {
        throw new Error('The original research should have author and title.');
      }

      Object.assign(this, { originalResearches, comments });
    }

    addComment = (comment) => {
      this.comments.push(comment);
      return 'The comment is added.';
    };

    toString = () => {
      const { title, author } = this.originalResearches;
      const comments = this.comments.length ? `\nComments:\n${this.comments.join('\n')}` : '';
      return `${super.toString()}\nOriginal Research: ${title} by ${author}${comments}`;
    };
  }

  class BookReview extends Article {
    constructor(title, content, book, clients = []) {
      super(title, content);
      Object.assign(this, { book, clients });
    }

    addClient = (clientName, orderDescription) => {
      if (this.clients.find((el) => el.clientName === clientName && el.orderDescription === orderDescription)) {
        throw new Error('This client has already ordered this review.');
      }

      this.clients.push({ clientName, orderDescription });
      return `${clientName} has ordered a review for ${this.book.name}`;
    };

    toString = () => {
      const orders = this.clients.length
        ? `\nOrders:\n${this.clients
            .map(({ clientName, orderDescription }) => `${clientName} - ${orderDescription}`)
            .join('\n')}`
        : '';
      return `${super.toString()}\nBook: ${this.book.name}${orders}`;
    };
  }

  return { Article, ShortReports, BookReview };
};
