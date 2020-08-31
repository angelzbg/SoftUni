sortArray = (array = [], orderBy = '') => array.sort({ asc: (a, b) => a - b, desc: (a, b) => b - a }[orderBy]);
