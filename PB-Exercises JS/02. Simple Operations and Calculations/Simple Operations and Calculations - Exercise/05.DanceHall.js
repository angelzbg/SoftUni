(input) => {
  const L = Number(input.shift()), W = Number(input.shift()), A = Number(input.shift())*100;
  
  const zala = (L*100) * (W*100);
  const garderob = A*A;
  const peika = zala/10;
  const free = zala-garderob-peika;
  let tanciori = free/(40+7000);
  console.log(Math.floor(tanciori));
}