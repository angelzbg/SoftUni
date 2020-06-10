flightsSchedule = (input) => {
    let flights = {};
    input.shift().forEach(flight => {
        let [ sector, destination ] = flight.split(' ');
        flights[sector] = { Destination: destination, Status: 'Ready to fly' };
    });
    input.shift().forEach(flight => {
        let [ sector, status ] = flight.split(' ');
        if(flights[sector]) {
            flights[sector].Status = status;
        }
    });
    let statusFilter = input.shift().shift();
    Object.entries(flights)
    .forEach(([key, value]) => {
        if(value.Status === statusFilter) {
            console.log(value);
        }
    });
};