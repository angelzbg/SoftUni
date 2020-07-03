piccolo = (input = []) => {
  [
    ...input.reduce((cars, line) => {
      let [direction, car] = line.split(", ");
      cars[direction === "IN" ? "add" : "delete"](car);
      return cars;
    }, new Set()),
  ]
    .sort()
    .forEach((car) => console.log(car));
};