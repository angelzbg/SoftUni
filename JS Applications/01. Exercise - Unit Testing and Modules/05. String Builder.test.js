const { assert } = require('chai');
const StringBuilder = require('./05. String Builder.js');

describe('05. String Builder Tests', () => {
  describe('Class properties Tests', () => {
    beforeEach(() => (sb = new StringBuilder()));

    it('Should contain functions append, prepend, insertAt, remove, toString', () => {
      const { append, prepend, insertAt, remove, toString } = sb;
      const actual = [append, prepend, insertAt, remove, toString].filter((p) => typeof p !== 'function').length;
      assert.equal(actual, 0);
    });

    it('Prototype should contain functions append, prepend, insertAt, remove, toString', () => {
      const { append, prepend, insertAt, remove, toString } = Object.getPrototypeOf(sb);
      const actual = [append, prepend, insertAt, remove, toString].filter((p) => typeof p !== 'function').length;
      assert.equal(actual, 0);
    });

    it('Should instantiate with property _stringArray as empty array', () => {
      assert.equal(sb._stringArray instanceof Array, true);
      assert.equal(sb._stringArray.length, 0);
    });
  });

  describe('Instantiation Tests', () => {
    it('Should instantiate with string argument', () => {
      assert.equal(new StringBuilder('text').toString(), 'text');
    });

    it('Should instantiate without argument', () => {
      assert.equal(new StringBuilder().toString(), '');
    });

    it("Should instantiate with property _stringArray ['i', 'n', 'i', 't', 'i', 'a', 'l'] as expected with 'initial' as argument", () => {
      const sb = new StringBuilder('initial');
      assert.deepEqual(sb._stringArray, [...'initial']);
    });

    it('Should not instantiate with wrong type argument', () => {
      assert.throw(() => new StringBuilder({}), 'Argument must be string');
      assert.throw(() => new StringBuilder(0), 'Argument must be string');
      assert.throw(() => new StringBuilder(true), 'Argument must be string');
    });
  });

  describe('Function append Tests', () => {
    it('Should append "abc"', () => {
      const sb = new StringBuilder();
      sb.append('abc');
      assert.equal(sb.toString(), 'abc');
    });

    it('Should append "abc"', () => {
      const sb = new StringBuilder('abc');
      sb.append('abc');
      assert.equal(sb.toString(), 'abcabc');
    });

    it('Should append "abc"', () => {
      const sb = new StringBuilder('');
      sb.append('abc');
      assert.equal(sb.toString(), 'abc');
    });

    it('Should append "abc", "text", "test"', () => {
      const sb = new StringBuilder('');
      sb.append('abc');
      sb.append('text');
      sb.append('test');
      assert.equal(sb.toString(), 'abctexttest');
    });

    it('Should append ""', () => {
      const sb = new StringBuilder('');
      sb.append('');
      assert.equal(sb.toString(), '');
    });

    it('Should throw Argument must be string for wrong argument type', () => {
      const sb = new StringBuilder();
      assert.throw(() => sb.append({}), 'Argument must be string');
      assert.throw(() => sb.append(0), 'Argument must be string');
      assert.throw(() => sb.append(true), 'Argument must be string');
      assert.throw(() => sb.append(), 'Argument must be string');
    });
  });

  describe('Function prepend Tests', () => {
    it('Should prepend "abc"', () => {
      const sb = new StringBuilder();
      sb.prepend('abc');
      assert.equal(sb.toString(), 'abc');
    });

    it('Should prepend "abc"', () => {
      const sb = new StringBuilder('text');
      sb.prepend('abc');
      assert.equal(sb.toString(), 'abctext');
    });

    it('Should prepend "abc"', () => {
      const sb = new StringBuilder('');
      sb.prepend('abc');
      assert.equal(sb.toString(), 'abc');
    });

    it('Should prepend "abc", "test", "test"', () => {
      const sb = new StringBuilder('');
      sb.prepend('abc');
      sb.prepend('text');
      sb.prepend('test');
      assert.equal(sb.toString(), 'testtextabc');
    });

    it('Should prepend ""', () => {
      const sb = new StringBuilder('');
      sb.prepend('');
      assert.equal(sb.toString(), '');
    });

    it('Should throw Argument must be string for wrong argument type', () => {
      const sb = new StringBuilder();
      assert.throw(() => sb.prepend({}), 'Argument must be string');
      assert.throw(() => sb.prepend(0), 'Argument must be string');
      assert.throw(() => sb.prepend(true), 'Argument must be string');
      assert.throw(() => sb.prepend(), 'Argument must be string');
    });
  });

  describe('Function insertAt Tests', () => {
    it('Should insert "abc" at 0', () => {
      const sb = new StringBuilder();
      sb.insertAt('abc', 0);
      assert.equal(sb.toString(), 'abc');
    });

    it('Should insert "test" at 0', () => {
      const sb = new StringBuilder('text');
      sb.insertAt('abc', 0);
      assert.equal(sb.toString(), 'abctext');
    });

    it('Should insert "se" at 2', () => {
      const sb = new StringBuilder('inrt');
      sb.insertAt('se', 2);
      assert.equal(sb.toString(), 'insert');
    });

    it('Should insert "abc" at 0', () => {
      const sb = new StringBuilder('');
      sb.insertAt('abc', 0);
      assert.equal(sb.toString(), 'abc');
    });

    it('Should insert "in" at 0, "se" at 2, and "rt" at 4', () => {
      const sb = new StringBuilder('');
      sb.insertAt('in', 0);
      sb.insertAt('se', 2);
      sb.insertAt('rt', 4);
      assert.equal(sb.toString(), 'insert');
      assert.deepEqual(sb._stringArray, [...'insert']);
    });

    it('Should throw Argument must be string for wrong argument type', () => {
      const sb = new StringBuilder();
      assert.throw(() => sb.insertAt({}, 0), 'Argument must be string');
      assert.throw(() => sb.insertAt(0, 0), 'Argument must be string');
      assert.throw(() => sb.insertAt(true, 0), 'Argument must be string');
      assert.throw(() => sb.insertAt(), 'Argument must be string');
    });

    it('Should throw silent error for wrong index argument type', () => {
      const sb = new StringBuilder();
      sb.insertAt('text', {});
      assert.equal(sb.toString(), 'text');
      sb.insertAt('text', []);
      assert.equal(sb.toString(), 'texttext');
    });
  });

  describe('Function remove Tests', () => {
    it('Should remove at 0 with length 2', () => {
      const sb = new StringBuilder();
      sb.remove(0, 2);
      assert.equal(sb.toString(), '');
    });

    it('Should remove at 0 with length 3', () => {
      const sb = new StringBuilder('testtext');
      sb.remove(0, 3);
      assert.equal(sb.toString(), 'ttext');
    });

    it('Should remove at 3 with length 2', () => {
      const sb = new StringBuilder('testtext');
      sb.remove(3, 2);
      assert.equal(sb.toString(), 'tesext');
    });

    it('Should remove at 3 with length 2, at 0 with length 3, at 6 with length 1', () => {
      const sb = new StringBuilder('what a beautiful test mate');
      sb.remove(3, 2);
      sb.remove(0, 3);
      sb.remove(6, 1);
      assert.equal(sb.toString(), 'a beauiful test mate');
      assert.deepEqual(sb._stringArray, [...'a beauiful test mate']);
    });

    it('Should throw silent error when wrong argument types are passed', () => {
      const sb = new StringBuilder('insert');
      sb.remove({}, 2);
      assert.equal(sb.toString(), 'sert');
      sb.remove(0, {});
      assert.equal(sb.toString(), 'sert');
      sb.remove();
      assert.equal(sb.toString(), 'sert');
    });
  });

  describe('Functions append, prepend, insertAt and remove Tests using append, prepend, remove, insertAt', () => {
    it('Should build the string "1337"', () => {
      const sb = new StringBuilder('leet');
      sb.append('7');
      assert.equal(sb.toString(), 'leet7');
      sb.prepend('1');
      assert.equal(sb.toString(), '1leet7');
      sb.remove(1, 4);
      assert.equal(sb.toString(), '17');
      sb.insertAt('33', 1);
      assert.equal(sb.toString(), '1337');
    });
  });

  describe('Function toString Tests', () => {
    it('Should return a string with all elements joined by an empty string', () => {
      const sb = new StringBuilder('what dafuq mate');
      assert.equal(sb.toString(), 'what dafuq mate');
      assert.deepEqual([...sb.toString()], sb._stringArray);
    });
  });
});
