(input) => {
  const rectangles = Number(input.shift()),
  		length = Number(input.shift()),
  		width = Number(input.shift()),
  		areaRectangles = rectangles * (length+2*0.30) * (width+2*0.30),
  		areaKareta = rectangles * (length/2) * (length/2),
  		priceUSD = areaRectangles * 7 + areaKareta * 9,
  		priceBGN = priceUSD * 1.85;
  console.log(`${priceUSD.toFixed(2)} USD\n${priceBGN.toFixed(2)} BGN`);
}