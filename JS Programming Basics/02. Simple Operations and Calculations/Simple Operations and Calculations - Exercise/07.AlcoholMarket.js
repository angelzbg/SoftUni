(input) => {
  const cenaUiski = Number(input.shift()),
  		biraLitri = Number(input.shift()),
  		vinoLitri = Number(input.shift()),
  		rikiqLitri = Number(input.shift()),
  		uiskiLitri = Number(input.shift()),
  		cenaRikiq = cenaUiski/2,
  		cenaVino = cenaRikiq*0.60,
  		cenaBira = cenaRikiq*0.20;
  
  let price = rikiqLitri*cenaRikiq + vinoLitri*cenaVino + biraLitri*cenaBira + uiskiLitri*cenaUiski;
  console.log(price.toFixed(2));
}