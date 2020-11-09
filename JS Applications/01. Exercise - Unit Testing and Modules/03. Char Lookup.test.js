const { assert } = require('chai');
const lookupChar = require('./03. Char Lookup.js');

describe('03. Char Lookup Tests', () => {
  it('Should return "t" for ("text", 0)', () => {
    assert.equal(lookupChar('text', 0), 't');
  });

  it('Should return "x" for ("text", 2)', () => {
    assert.equal(lookupChar('text', 2), 'x');
  });

  it('Should return undefined for non string first argument', () => {
    assert.equal(lookupChar({}, 5), undefined);
  });

  it('Should return undefined for non number second argument', () => {
    assert.equal(lookupChar('text', {}), undefined);
  });

  it('Should return undefined for non integer number second argument', () => {
    assert.equal(lookupChar('text', 0.1), undefined);
  });

  it('Should return Incorrect index for ("text", 4)', () => {
    assert.equal(lookupChar('text', 4), 'Incorrect index');
  });

  it('Should return Incorrect index for ("text", -1)', () => {
    assert.equal(lookupChar('text', -1), 'Incorrect index');
  });

  it('Should return Incorrect index for ("", 0)', () => {
    assert.equal(lookupChar('', 0), 'Incorrect index');
  });
});
