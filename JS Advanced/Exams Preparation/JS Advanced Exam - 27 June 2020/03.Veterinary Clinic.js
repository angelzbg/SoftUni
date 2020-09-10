class Veterinaryclinic {
    constructor(clinicName, capacity) {
        [this.clinicName, this.capacity, this.clients, this.workload, this.profit] = [clinicName, capacity, [], 0, 0];
    }

    newCustomer(ownerName, petName, kind, procedures) {
        if (this.workload === this.capacity) {
            throw new Error('Sorry, we are not able to accept more patients!');
        }

        const foundClient = this.clients.find((c) => c.ownerName === ownerName);

        if (foundClient) {
            const foundPet = foundClient.pets[petName];
            if (foundPet) {
                if (foundPet.procedures.length) {
                    throw new Error(
                        `This pet is already registered under ${ownerName} name! ${petName} is on our lists, waiting for ${foundPet.procedures.join(
                            ', ',
                        )}.`,
                    );
                } else {
                    foundPet.procedures = procedures;
                }
            } else {
                foundClient.pets[petName] = { kind, procedures };
            }
        } else {
            this.clients.push({ ownerName, pets: { [petName]: { kind, procedures } } });
        }

        this.workload++;
        return `Welcome ${petName}!`;
    }

    onLeaving(ownerName, petName) {
        const foundClient = this.clients.find((c) => c.ownerName === ownerName);
        if (!foundClient) {
            throw new Error('Sorry, there is no such client!');
        }

        const foundPet = foundClient.pets[petName];
        if (!foundPet || !foundPet.procedures.length) {
            throw new Error(`Sorry, there are no procedures for ${petName}!`);
        }

        this.profit += foundPet.procedures.length * 500;
        foundPet.procedures.length = 0;
        this.workload--;
        return `Goodbye ${petName}. Stay safe!`;
    }

    toString() {
        const busy = `${this.clinicName} is ${Math.floor((100 / this.capacity) * this.workload)}% busy today!\n`;
        const profit = `Total profit: ${this.profit.toFixed(2)}$\n`;
        const clients = this.clients
            .sort((a, b) => a.ownerName.localeCompare(b.ownerName))
            .map((client) => {
                return (
                    `${client.ownerName} with:\n` +
                    Object.entries(client.pets)
                        .sort((a, b) => a[0].localeCompare(b[0]))
                        .map(([petName, { kind, procedures }]) => {
                            return `---${petName} - a ${kind.toLowerCase()} that needs: ${procedures.join(', ')}`;
                        })
                        .join('\n')
                );
            })
            .join('\n');

        return `${busy}${profit}${clients}`;
    }
}
