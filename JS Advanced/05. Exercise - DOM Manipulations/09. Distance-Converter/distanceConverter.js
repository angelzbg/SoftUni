attachEventsListeners = () => {
    const unitsInMeters = [1000, 1, 0.01, 0.001, 1609.34, 0.9144, 0.3048, 0.0254];
    const elements = ['inputUnits', 'outputUnits', 'inputDistance', 'outputDistance'].reduce(
        (elements, id) => Object.assign(elements, { [id]: document.getElementById(id) }),
        {},
    );
    document.getElementById('convert').addEventListener('click', () => {
        elements.outputDistance.value =
            (unitsInMeters[elements.inputUnits.selectedIndex] * +elements.inputDistance.value) /
            unitsInMeters[elements.outputUnits.selectedIndex];
    });
};
