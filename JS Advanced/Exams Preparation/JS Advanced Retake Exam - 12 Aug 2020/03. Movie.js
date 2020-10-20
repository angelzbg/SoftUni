class Movie {
  constructor(movieName, ticketPrice) {
    ticketPrice = Number(ticketPrice);
    Object.assign(this, { movieName, ticketPrice, screenings: [], totalProfit: 0, soldTickets: 0 });
  }

  newScreening(date, hall, description) {
    if (this.screenings.find((s) => s.date === date && s.hall === hall)) {
      throw new Error(`Sorry, ${hall} hall is not available on ${date}`);
    }

    this.screenings.push({ date, hall, description });
    return `New screening of ${this.movieName} is added.`;
  }

  endScreening(date, hall, soldTickets) {
    soldTickets = Number(soldTickets);
    const foundIndex = this.screenings.findIndex((s) => s.date === date && s.hall === hall);
    if (foundIndex === -1) {
      throw new Error(`Sorry, there is no such screening for ${this.movieName} movie.`);
    }

    const currentProfit = soldTickets * this.ticketPrice;
    this.totalProfit += currentProfit;
    this.soldTickets += soldTickets;
    this.screenings.splice(foundIndex, 1);
    return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${currentProfit}`;
  }

  toString() {
    return `${this.movieName} full information:\nTotal profit: ${this.totalProfit.toFixed(0)}$\nSold Tickets: ${
      this.soldTickets
    }${
      this.screenings.length
        ? `\nRemaining film screenings:\n${this.screenings
            .sort((a, b) => a.hall.localeCompare(b.hall))
            .map(({ date, hall, description }) => `${hall} - ${date} - ${description}`)
            .join('\n')}`
        : '\nNo more screenings!'
    }`;
  }
}
