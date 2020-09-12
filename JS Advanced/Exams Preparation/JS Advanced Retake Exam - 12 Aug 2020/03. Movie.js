class Movie {
  constructor(movieName, ticketPrice) {
    Object.assign(this, { movieName, ticketPrice: +ticketPrice, screenings: [], totalProfit: 0, soldTickets: 0 });
  }

  newScreening(date, hall, description) {
    const found = this.screenings.find((el) => el.hall === hall && el.date === date);
    if (found) {
      throw new Error(`Sorry, ${hall} hall is not available on ${date}`);
    }

    this.screenings.push({ hall, date, description });
    return `New screening of ${this.movieName} is added.`;
  }

  endScreening(date, hall, soldTickets) {
    const foundIndex = this.screenings.findIndex((el) => el.hall === hall && el.date === date);
    if (foundIndex === -1) {
      throw new Error(`Sorry, there is no such screening for ${this.movieName} movie.`);
    }

    const currentProfit = soldTickets * this.ticketPrice;
    this.soldTickets += soldTickets;
    this.totalProfit += currentProfit;
    this.screenings.splice(foundIndex, 1);

    return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${currentProfit}`;
  }

  toString() {
    let output = `${this.movieName} full information:\nTotal profit: ${this.totalProfit.toFixed(0)}$\nSold Tickets: ${
      this.soldTickets
    }\n`;

    if (this.screenings.length) {
      output += `Remaining film screenings:\n${this.screenings
        .sort((a, b) => a.hall.localeCompare(b.hall))
        .map(({ hall, date, description }) => `${hall} - ${date} - ${description}`)
        .join('\n')}`;
    } else {
      output += 'No more screenings!';
    }

    return output;
  }
}
