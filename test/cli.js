const path = require('path');
const { describe, it } = require('mocha');
const { assert } = require('chai');
const { file, conversion } = require('chumpi');
const { cli } = require('../src');

const { execute } = conversion;
const { readFilePromise } = file;

describe('cli basic cases suite', () => {
  it('Parent with one child', async () => {
    const expected = [{ name: 'master' }, { name: 'detail', master: ['master'] }];
    const dir = path.resolve(__dirname, '01');
    const input = ['node', 'teseo', '-d', dir, '-f', 'yaml'];
    const actual = await cli(input);
    const x = await readFilePromise(actual);
    const conv = await execute('parse', 'yaml', x);
    assert.deepEqual(conv[0], expected[0]);
  });

  it('Parent with more than one child', async () => {
    const expected = [{ name: 'master' }, { name: 'detail', master: ['master'] }, { name: 'detail2', master: ['master'] }];
    const dir = path.resolve(__dirname, '02');
    const input = ['node', 'teseo', '-d', dir, '-f', 'yaml'];
    const actual = await cli(input);
    const x = await readFilePromise(actual);
    const conv = await execute('parse', 'yaml', x);
    assert.deepEqual(conv[0], expected[0]);
  });

  it('Master with one child and grandchild', async () => {
    const expected = [{ name: 'master' }, { name: 'detail', master: ['master'] }, { name: 'detail2', master: ['detai  l'] }];
    const dir = path.resolve(__dirname, '03');
    const input = ['node', 'teseo', '-d', dir, '-f', 'yaml'];
    const actual = await cli(input);
    const x = await readFilePromise(actual);
    const conv = await execute('parse', 'yaml', x);
    assert.deepEqual(conv[0], expected[0]);
  });

  it('Detail: Master; Detail2: Detail; Detail3: Detail, Detail2; Detail4: master, detail3', async () => {
    const expected = [{ name: 'master' }, { name: 'detail', master: ['master'] }, { name: 'detail2', master: ['detail'] }, { name: 'detail3', master: ['detail', 'detail2'] }, { name: 'detail4', master: ['master', 'detail3'] }];
    const dir = path.resolve(__dirname, '04');
    const input = ['node', 'teseo', '-d', dir, '-f', 'yaml'];
    const actual = await cli(input);
    const x = await readFilePromise(actual);
    const conv = await execute('parse', 'yaml', x);
    assert.deepEqual(conv[0], expected[0]);
  });

  it('Detail: Master; Detail2: Detail; Detail3: Detail, Detail2; Detail4: master, detail3', async () => {
    const expected = {
      console: true,
    };
    const dir = path.resolve(__dirname, '04');
    const input = ['node', 'teseo', '-d', dir, '-f'];
    const actual = await cli(input);
    assert.strictEqual(actual.console, expected.console);
  });
});
