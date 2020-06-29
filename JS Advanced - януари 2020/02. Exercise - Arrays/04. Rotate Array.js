rotateArray = (array = []) => {
    const rotations = Number(array.pop()) % array.length;
    array.unshift(...array.splice(array.length - rotations));

    return array.join(' ');
};