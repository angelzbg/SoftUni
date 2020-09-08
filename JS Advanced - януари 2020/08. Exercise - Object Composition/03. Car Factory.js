carFactory = ({ model, power, color, carriage, wheelsize }) => {
    const engines = [
        { power: 90, volume: 1800 },
        { power: 120, volume: 2400 },
        { power: 200, volume: 3500 },
    ];

    return {
        model,
        engine: engines.find((e) => e.power >= power),
        carriage: {
            type: carriage,
            color,
        },
        wheels: new Array(4).fill().map((w) => 2 * Math.round(wheelsize / 2) - 1),
    };
};
