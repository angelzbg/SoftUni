(input) => {
    const dohod = Number(input.shift()),
            sredenUspeh = Number(input.shift()),
            minimalnaZaplata = Number(input.shift());
    let socialna = 0, otlichen = 0;
    if(dohod < minimalnaZaplata &&  sredenUspeh > 4.5) socialna = minimalnaZaplata*0.35;
    if(sredenUspeh >= 5.5) otlichen = sredenUspeh*25;

    if(socialna > 0 && otlichen > 0) {
        if(socialna > otlichen) {
            console.log(`You get a Social scholarship ${Math.floor(socialna)} BGN`);
        } else {
            console.log(`You get a scholarship for excellent results ${Math.floor(otlichen)} BGN`);
        }
    }
    else if(socialna > 0) console.log(`You get a Social scholarship ${Math.floor(socialna)} BGN`);
    else if(otlichen > 0) console.log(`You get a scholarship for excellent results ${Math.floor(otlichen)} BGN`);
    else console.log("You cannot get a scholarship!");
}