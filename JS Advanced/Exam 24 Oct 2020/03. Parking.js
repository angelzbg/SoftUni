class Parking {
  constructor(capacity) {
    Object.assign(this, { capacity, vehicles: [] });
  }

  addCar(carModel, carNumber) {
    if (this.capacity === this.vehicles.length) {
      throw new Error('Not enough parking space.');
    }

    this.vehicles.push({ carModel, carNumber, payed: false });
    return `The ${carModel}, with a registration number ${carNumber}, parked.`;
  }

  removeCar(carNumber) {
    const foundIndex = this.vehicles.findIndex((c) => c.carNumber === carNumber);
    const found = this.vehicles[foundIndex];
    if (!found) {
      throw new Error("The car, you're looking for, is not found.");
    }

    if (!found.payed) {
      throw new Error(`${carNumber} needs to pay before leaving the parking lot.`);
    }

    this.vehicles.splice(foundIndex, 1);
    return `${carNumber} left the parking lot.`;
  }

  pay(carNumber) {
    const foundIndex = this.vehicles.findIndex((c) => c.carNumber === carNumber);
    const found = this.vehicles[foundIndex];
    if (!found) {
      throw new Error(`${carNumber} is not in the parking lot.`);
    }

    if (found.payed) {
      throw new Error(`${carNumber}'s driver has already payed his ticket.`);
    }

    found.payed = true;
    return `${carNumber}'s driver successfully payed for his stay.`;
  }

  getStatistics(carNumber) {
    if (!carNumber) {
      return `The Parking Lot has ${this.capacity - this.vehicles.length} empty spots left.\n${this.vehicles
        .sort((a, b) => a.carModel.localeCompare(b.carModel))
        .map(({ carModel, carNumber, payed }) => `${carModel} == ${carNumber} - ${payed ? 'Has payed' : 'Not payed'}`)
        .join('\n')}`;
    } else {
      const found = this.vehicles.find((c) => c.carNumber === carNumber);
      return `${found.carModel} == ${found.carNumber} - ${found.payed ? 'Has payed' : 'Not payed'}`;
    }
  }
}
