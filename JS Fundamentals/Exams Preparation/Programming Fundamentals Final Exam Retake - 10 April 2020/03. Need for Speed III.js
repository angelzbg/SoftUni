needForSpeed3 = (input) => {

    class Car {

        constructor(model, mileage, fuel) {
            this.model = model;
            this.mileage = Number(mileage);
            this.fuel = Number(fuel);
        }

        drive(distance, fuel) {
            distance = Number(distance);
            fuel = Number(fuel);
            if(this.fuel >= fuel) {
                this.fuel -= fuel;
                this.mileage += distance;
                console.log(`${this.model} driven for ${distance} kilometers. ${fuel} liters of fuel consumed.`);

                if(this.mileage >= 100000) {
                    console.log(`Time to sell the ${this.model}!`);
                    return true;
                }
            } else {
                console.log('Not enough fuel to make that ride');
            }

            return false;
        };

        refuel(fuel) {
            fuel = Number(fuel);
            let newFuel = (this.fuel + fuel) > 75 ? 75 : this.fuel + fuel;
            console.log(`${this.model} refueled with ${newFuel - this.fuel} liters`);
            this.fuel = newFuel;
        };

        revert(kilometers) {
            kilometers = Number(kilometers);
            this.mileage -= kilometers;
            if(this.mileage >= 10000) {
                console.log(`${this.model} mileage decreased by ${kilometers} kilometers`);
            } else {
                this.mileage = 10000;
            }
        };
    }

    class CarCollection {

        constructor() {
            this.cars = {};
        }

        addCar(model, mileage, fuel) {
            this.cars[model] = new Car(model, mileage, fuel);
        };

        printCars() {
            Object
                .entries(this.cars)
                .sort((a, b) => b[1].mileage - a[1].mileage || a[0].localeCompare(b[0]))
                .forEach(([model, car]) => {
                    console.log(`${model} -> Mileage: ${car.mileage} kms, Fuel in the tank: ${car.fuel} lt.`);
                });
        };

        Drive(model, distance, fuel) {
            if(this.cars[model].drive(distance, fuel)) {
                delete this.cars[model];
            }
        };

        Refuel(model, fuel) {
            this.cars[model].refuel(fuel);
        };

        Revert(model, kilometers) {
            this.cars[model].revert(kilometers);
        };

        executeAction(actionParams) {
            this[actionParams.shift()](...actionParams);
        };
    }

    let cars = new CarCollection();

    const count = Number(input.shift());
    for(let i = 0; i < count; i++) {
        cars.addCar(...input.shift().split('|'));
    }

    while((action = input.shift().split(' : '))[0] !== 'Stop') {
        cars.executeAction(action);
    }

    cars.printCars();
};

needForSpeed3([
    '4',
    'Lamborghini Veneno|11111|74',
    'Bugatti Veyron|12345|67',
    'Koenigsegg CCXR|67890|12',
    'Aston Martin Valkryie|99900|50',
    'Drive : Koenigsegg CCXR : 382 : 82',
    'Drive : Aston Martin Valkryie : 99 : 23',
    'Drive : Aston Martin Valkryie : 2 : 1',
    'Refuel : Lamborghini Veneno : 40',
    'Revert : Bugatti Veyron : 2000',
    'Stop'
  ]);