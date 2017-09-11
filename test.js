'use strict';

require('mocha');
var assert = require('assert');
var defaultCompare = require('./');

describe('default-compare', function() {
  it('should export a function', function() {
    assert.equal(typeof defaultCompare, 'function');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      defaultCompare('a', 'b', {foo: 'bar'});
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected "prop" to be undefined or a string');
      cb();
    }
  });

  it('should sort an array with null and undefined values', function() {
    var arr = ['c', 'a', undefined, 'b', 'd', null, 'e'];
    assert.deepEqual(arr.sort(defaultCompare), ['a', 'b', 'c', 'd', 'e', null, undefined]);
  });

  it('should sort an array of objects with null and undefined values', function() {
    var arr = [
      {name: 'c', title: 'C'},
      undefined,
      {name: 'a', title: 'A'},
      {title: 'G'},
      {name: 'b', title: 'B'},
      null,
      {name: 'd', title: 'D'},
      {name: null, title: 'F'},
      {name: 'e', title: 'E'}
    ];

    arr.sort(function(a, b) {
      return defaultCompare(a, b, 'name');
    });

    assert.deepEqual(arr, [
      {name: 'a', title: 'A'},
      {name: 'b', title: 'B'},
      {name: 'c', title: 'C'},
      {name: 'd', title: 'D'},
      {name: 'e', title: 'E'},
      null,
      {name: null, title: 'F'},
      {title: 'G'},
      undefined
    ]);
  });
});
