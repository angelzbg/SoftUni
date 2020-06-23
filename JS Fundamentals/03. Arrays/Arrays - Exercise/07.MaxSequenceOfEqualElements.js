maxSequence = (arr) => {
    let [prev, current] = [ [arr[0]], [arr[0]] ];
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === current[0]) {
            current.push(arr[i]);
        } else {
            if(current.length > prev.length) {
                prev = current.slice();
            }

            current = [ arr[i] ];
        }
    }

    console.log(prev.length >= current.length ? prev.join(' ') : current.join(' '));
};