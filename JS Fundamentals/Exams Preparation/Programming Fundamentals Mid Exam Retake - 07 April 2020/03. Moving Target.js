movingTarget = (input) => {
  let targets = input.shift().split(' ').map(Number);
  while(([cmd, index, value] = input.shift().split(' '))[0] !== 'End') {
    index = Number(index);
    value = Number(value);
    if(cmd === 'Shoot') {
      if(targets[index] !== undefined) {
        targets[index] -= value;
        if(targets[index] <= 0) {
          targets.splice(index, 1);
        }
      }
    } else if(cmd === 'Add') {
      if(targets[index] !== undefined) {
        targets.splice(index, 0, value)
      } else {
        console.log('Invalid placement!');
      }
    } else { // 'Strike'
      let startIndex = index - value;
      let endIndex = index + value;
      if(targets[startIndex] === undefined || targets[endIndex] === undefined) {
        console.log('Strike missed!');
      } else {
        targets.splice(startIndex, value * 2 + 1);
      }
    }
  }

  console.log(targets.join('|'));
};

movingTarget([
    '52 74 23 44 96 110',
    'Shoot 5 10',
    'Shoot 1 80',
    'Strike 2 1',
    'Add 22 3',
    'End'
  ]);

movingTarget([
    '47 55 85 78 99 20',
    'Shoot 1 55',
    'Shoot 8 15',
    'Strike 2 3',
    'Add 0 22',
    'Add 2 40',
    'Add 2 50',
    'End'
  ]);