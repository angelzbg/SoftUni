const { assert } = require('chai');
const PaymentPackage = require('./06. Payment Package.js');

describe('06. Payment Package Tests', () => {
  describe('Class properties and instantiation Tests', () => {
    beforeEach(() => (pp = new PaymentPackage('test', 1.0)));

    it('Should contain properties name, value, VAT, active, toString', () => {
      assert.equal(pp instanceof PaymentPackage, true);
      const { name, value, VAT, active } = pp;
      const actual = [name, value, VAT, active, toString].filter((p) => !p).length;
      assert.equal(actual, 0);
    });

    it('Should instantiate with valid default properties values', () => {
      const { name, value, VAT, active } = pp;
      assert.deepEqual([name, value, VAT, active], ['test', 1, 20, true]);
      assert.deepEqual([name !== '', value >= 0, VAT >= 0, typeof active === 'boolean'], [true, true, true, true]);
    });

    it('Should instantiate with correct types for properties values', () => {
      const { name, value, VAT, active, toString } = pp;
      let types = [name, value, VAT, active, toString].map((p) => typeof p);
      assert.deepEqual(types, ['string', 'number', 'number', 'boolean', 'function']);
    });
  });

  describe('set name Tests', () => {
    it('Should set name value for non-empty string argument', () => {
      const pp = new PaymentPackage('test', 1);
      pp.name = 'text';
      assert.equal(pp.name, 'text');
      assert.equal(pp._name, 'text');
    });

    it('Should throw Name must be a non-empty string for non string argument', () => {
      assert.throw(() => new PaymentPackage(null, 1), 'Name must be a non-empty string');
    });

    it('Should throw Name must be a non-empty string for empty string argument', () => {
      assert.throw(() => new PaymentPackage('', 1), 'Name must be a non-empty string');
      assert.throw(() => new PaymentPackage(), 'Name must be a non-empty string');
    });
  });

  describe('get name Tests', () => {
    it('Should get name value', () => {
      assert.equal(new PaymentPackage('test', 1).name, 'test');
    });
  });

  describe('set value Tests', () => {
    it('Should set value for positive integer number', () => {
      const pp = new PaymentPackage('test', 1);
      pp.value = 2;
      assert.equal(pp.value, 2);
      assert.equal(pp._value, 2);
    });

    it('Should throw Value must be a non-negative number for non number argument', () => {
      assert.throw(() => new PaymentPackage('test', 'text'), 'Value must be a non-negative number');
      assert.throw(() => new PaymentPackage('test', null), 'Value must be a non-negative number');
      assert.throw(() => new PaymentPackage('test'), 'Value must be a non-negative number');
    });

    it('Should throw Value must be a non-negative number for negative integer argument', () => {
      assert.throw(() => new PaymentPackage('test', -1), 'Value must be a non-negative number');
    });
  });

  describe('get value Tests', () => {
    it('Should get the value of value', () => {
      assert.equal(new PaymentPackage('test', 1).value, 1);
    });
  });

  describe('set VAT Tests', () => {
    it('Should set VAT value for positive integer argument assignition', () => {
      const pp = new PaymentPackage('test', 1);
      pp.VAT = 50;
      assert.equal(pp.VAT, 50);
      assert.equal(pp._VAT, 50);
    });

    it('Should throw VAT must be a non-negative number for non number assignition', () => {
      const pp = new PaymentPackage('test', 1);
      assert.throw(() => (pp.VAT = {}), 'VAT must be a non-negative number');
      assert.throw(() => (pp.VAT = 'text'), 'VAT must be a non-negative number');
      assert.throw(() => (pp.VAT = undefined), 'VAT must be a non-negative number');
      assert.equal(pp.VAT, 20);
      assert.equal(pp._VAT, 20);
    });

    it('Should throw VAT must be a non-negative number for negative number assignition', () => {
      const pp = new PaymentPackage('test', 1);
      assert.throw(() => (pp.VAT = -1), 'VAT must be a non-negative number');
      assert.equal(pp.VAT, 20);
      assert.equal(pp._VAT, 20);
    });
  });

  describe('get VAT Tests', () => {
    it('Should get VAT value', () => {
      assert.equal(new PaymentPackage('test', 1).VAT, 20);
    });
  });

  describe('set active Tests', () => {
    it('Should set active for boolean argument', () => {
      const pp = new PaymentPackage('test', 1);
      pp.active = true;
      assert.equal(pp.active, true);
      assert.equal(pp._active, true);
      pp.active = false;
      assert.equal(pp.active, false);
      assert.equal(pp._active, false);
    });

    it('Should throw Active status must be a boolean for non boolean argument', () => {
      assert.throw(() => (new PaymentPackage('test', 1).active = {}), 'Active status must be a boolean');
      assert.throw(() => (new PaymentPackage('test', 1).active = null), 'Active status must be a boolean');
      assert.throw(() => (new PaymentPackage('test', 1).active = 'text'), 'Active status must be a boolean');
      assert.throw(() => (new PaymentPackage('test', 1).active = 1), 'Active status must be a boolean');
      assert.throw(() => (new PaymentPackage('test', 1).active = undefined), 'Active status must be a boolean');
    });
  });

  describe('get active Tests', () => {
    it('Should get active value', () => {
      assert.equal(new PaymentPackage('test', 1).active, true);
    });
  });

  describe('Function toString Tests', () => {
    it('Should print current overview without inactive status', () => {
      assert.equal(
        new PaymentPackage('test', 1).toString(),
        'Package: test\n- Value (excl. VAT): 1\n- Value (VAT 20%): 1.2'
      );
    });

    it('Should print current overview with inactive status', () => {
      const pp = new PaymentPackage('test', 2);
      pp.active = false;
      assert.equal(pp.toString(), 'Package: test (inactive)\n- Value (excl. VAT): 2\n- Value (VAT 20%): 2.4');
    });
  });
});
