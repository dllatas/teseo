const main = require('./main');
const cli = require('./cli');
const sort = require('./sort');

module.exports = {
  main,
  cli,
  sort: (tables, master, name) => sort.execute(tables, master, name),
};
