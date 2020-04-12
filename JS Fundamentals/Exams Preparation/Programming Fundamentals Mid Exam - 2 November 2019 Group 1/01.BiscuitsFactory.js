biscuitsFactory = ([ perWorkerADay, workers, competition ]) => {
    perWorkerADay = Number(perWorkerADay);
    workers = Number(workers);
    competition = Number(competition);
    let biscuits = perWorkerADay * workers * 20 + Math.floor(perWorkerADay * workers * .75) * 10;
    let percent = 100 / competition * biscuits - 100;
    console.log(`You have produced ${biscuits} biscuits for the past month.`);
    console.log(biscuits > competition ? `You produce ${percent.toFixed(2)} percent more biscuits.` : `You produce ${Math.abs(percent).toFixed(2)} percent less biscuits.`);
}

biscuitsFactory([ '78', '8', '16000' ]);