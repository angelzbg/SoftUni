fibonacci = ([f0, f1] = [0, 1]) => () => ([f0, f1] = [f1, f0 + f1])[0];
