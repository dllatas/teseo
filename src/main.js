const chumpi = require('chumpi');
const sort = require('./sort');
const schema = require('./schema');

async function main(options) {
  chumpi.validation.enforce(options, schema);
  const files = await chumpi.file.read(options.dir);
  const tables = await chumpi.conversion.execute('parse', options.format, files);
  const sorted = sort.execute(tables, options.master, options.name);
  return sorted;
}

module.exports = main;
