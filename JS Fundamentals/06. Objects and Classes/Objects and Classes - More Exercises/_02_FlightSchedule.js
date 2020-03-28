flightsSchedule = (input) => {
    let flights = {};
    input.shift().forEach(flight => {
        let parts = flight.split(' ');
        flights[parts[0]] = { Destination: parts[1], Status: 'Ready to fly' };
    });
    input.shift().forEach(flight => {
        let parts = flight.split(' ');
        if(flights[parts[0]]) {
            flights[parts[0]].Status = parts[1];
        }
    });
    let statusFilter = input.shift().shift();
    Object.entries(flights).forEach(([key, value]) => {
        if(value.Status === statusFilter) {
            console.log(value);
        }
    });
}