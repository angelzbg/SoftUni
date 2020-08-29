areAndVolumeCalculator = (area, vol, figures = '') => {
    return JSON.parse(figures).reduce((result, figure) => {
        result.push({ area: Math.abs(area.call(figure)), volume: Math.abs(vol.call(figure)) });
        return result;
    }, []);
};
