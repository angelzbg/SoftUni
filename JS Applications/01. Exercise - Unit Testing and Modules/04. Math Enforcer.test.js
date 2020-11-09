const { assert } = require('chai');
const { addFive, subtractTen, sum } = require('./04. Math Enforcer.js');

describe('04. Math Enforcer Tests', () => {
  describe('Function addFive Tests', () => {
    it('Should return 10 for (5)', () => {
      assert.equal(addFive(5), 10);
    });

    it('Should return 5.5 for (0.5)', () => {
      assert.closeTo(addFive(0.5), 5.5, 0.1);
    });

    it('Should return 4.5 for (-0.5)', () => {
      assert.closeTo(addFive(-0.5), 4.5, 0.1);
    });

    it('Should return undefined for ({})', () => {
      assert.equal(addFive({}), undefined);
    });
  });

  describe('Function subtractTen Tests', () => {
    it('Should return 10 for (20)', () => {
      assert.equal(subtractTen(20), 10);
    });

    it('Should return 0.5 for (10.5)', () => {
      assert.closeTo(subtractTen(10.5), 0.5, 0.1);
    });

    it('Should return -10.5 for (-0.5)', () => {
      assert.closeTo(subtractTen(-0.5), -10.5, 0.1);
    });

    it('Should return undefined for ({})', () => {
      assert.equal(subtractTen({}), undefined);
    });
  });

  describe('Function sum Tests', () => {
    it('Should return 20 for (10, 10)', () => {
      assert.equal(sum(10, 10), 20);
    });

    it('Should return 5.1 for (1.5, 3.6)', () => {
      assert.closeTo(sum(1.5, 3.6), 5.1, 0.1);
    });

    it('Should return 0 for (1, -1)', () => {
      assert.equal(sum(1, -1), 0);
    });

    it('Should return undefined for ({}, {})', () => {
      assert.equal(sum({}, {}), undefined);
    });

    it('Should return undefined for ({}, 1)', () => {
      assert.equal(sum({}, 1), undefined);
    });

    it('Should return undefined for (1, {})', () => {
      assert.equal(sum(1, {}), undefined);
    });
  });
});
