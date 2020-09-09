constructionCrew = (worker) => {
    if (worker.dizziness) {
        const { experience, weight } = worker;
        worker.levelOfHydrated += experience * weight * 0.1;
        worker.dizziness = false;
    }

    return worker;
};
