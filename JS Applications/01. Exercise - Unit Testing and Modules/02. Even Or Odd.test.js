const { assert } = require('chai');
const isOddOrEven = require('./02. Even Or Odd.js');

describe('02. Even Or Odd Tests', () => {
  it('Should return even for even length strings', () => {
    assert.equal(isOddOrEven('tu'), 'even');
    assert.equal(isOddOrEven('tutu'), 'even');
    assert.equal(isOddOrEven('tututu'), 'even');
  });

  it('Should return odd for odd length strings', () => {
    assert.equal(isOddOrEven('tri'), 'odd');
    assert.equal(isOddOrEven('triii'), 'odd');
    assert.equal(isOddOrEven('triiiii'), 'odd');
  });

  it('Should return undefined for wrong type argument', () => {
    assert.equal(isOddOrEven(0), undefined);
    assert.equal(isOddOrEven({}), undefined);
  });
});
