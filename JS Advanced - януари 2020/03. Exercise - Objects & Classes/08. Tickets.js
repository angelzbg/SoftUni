tickets = (data = [], criteria = '') => {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }

    const statuses = { available: 0, departed: 1, sold: 2 };
    const sortTickets = {
        price: (a, b) => a.price - b.price,
        status: (a, b) => statuses[a.status] - statuses[b.status],
        destination: (a, b) => a.destination.localeCompare(b.destination),
    };

    return data.map((str) => new Ticket(...str.split('|'))).sort(sortTickets[criteria]);
};
