class VeterinaryClinic {
  constructor(clinicName, capacity) {
    Object.assign(this, { clinicName, capacity, clients: [], totalProfit: 0, currentWorkload: 0 });
  }

  newCustomer = (ownerName, petName, kind, procedures) => {
    if (this.currentWorkload === this.capacity) {
      throw new Error('Sorry, we are not able to accept more patients!');
    }

    const client = this.clients.find((c) => c.ownerName === ownerName);
    if (client) {
      const pet = client.pets[petName];
      if (pet && pet.procedures.length) {
        throw new Error(
          `This pet is already registered under ${ownerName} name! ${petName} is on our lists, waiting for ${pet.procedures.join(
            ', '
          )}.`
        );
      } else {
        client.pets[petName] = { kind, procedures };
      }
    } else {
      this.clients.push({ ownerName, pets: { [petName]: { kind, procedures } } });
    }

    this.currentWorkload++;
    return `Welcome ${petName}!`;
  };

  onLeaving = (ownerName, petName) => {
    const client = this.clients.find((c) => c.ownerName === ownerName);
    if (!client) {
      throw new Error('Sorry, there is no such client!');
    }

    const pet = client.pets[petName];
    if (!pet || !pet.procedures.length) {
      throw new Error(`Sorry, there are no procedures for ${petName}!`);
    }

    this.totalProfit += pet.procedures.length * 500;
    pet.procedures.length = 0;
    this.currentWorkload--;
    return `Goodbye ${petName}. Stay safe!`;
  };

  toString = () => {
    const percentage = `${this.clinicName} is ${Math.floor((100 / this.capacity) * this.currentWorkload)}% busy today!`;
    const profit = `\nTotal profit: ${this.totalProfit.toFixed(2)}$\n`;
    const pets = this.clients
      .sort((a, b) => a.ownerName.localeCompare(b.ownerName))
      .map(({ ownerName, pets }) => {
        return `${ownerName} with:\n${Object.entries(pets)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(
            ([petName, { kind, procedures }]) =>
              `---${petName} - a ${kind.toLowerCase()} that needs: ${procedures.join(', ')}`
          )
          .join('\n')}`;
      })
      .join('\n');

    return percentage + profit + pets;
  };
}
