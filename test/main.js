const path = require('path');
const { describe, it } = require('mocha');
const { assert } = require('chai');
const { main } = require('../src');

describe('main basic cases suite', () => {
  const yaml = 'yaml';

  it('Parent with one child', async () => {
    const expected = [{ name: 'master' }, { name: 'detail', master: ['master'] }];
    const dir = path.resolve(__dirname, '01');
    const actual = await main({ dir, format: yaml });
    assert.deepEqual(actual, expected);
  });

  it('Parent with more than one child', async () => {
    const expected = [{ name: 'master' }, { name: 'detail', master: ['master'] }, { name: 'detail2', master: ['master'] }];
    const dir = path.resolve(__dirname, '02');
    const actual = await main({ dir, format: yaml });
    assert.deepEqual(actual, expected);
  });

  it('Master with one child and grandchild', async () => {
    const expected = [{ name: 'master' }, { name: 'detail', master: ['master'] }, { name: 'detail2', master: ['detail'] }];
    const dir = path.resolve(__dirname, '03');
    const actual = await main({ dir, format: yaml });
    assert.deepEqual(actual, expected);
  });

  it('Detail: Master; Detail2: Detail; Detail3: Detail, Detail2; Detail4: master, detail3', async () => {
    const expected = [{ name: 'master' }, { name: 'detail', master: ['master'] }, { name: 'detail2', master: ['detail'] }, { name: 'detail3', master: ['detail', 'detail2'] }, { name: 'detail4', master: ['master', 'detail3'] }];
    const dir = path.resolve(__dirname, '04');
    const actual = await main({ dir, format: yaml });
    assert.deepEqual(actual, expected);
  });
});
