const chumpi = require('chumpi');
const main = require('./main');
const message = require('./message');
const cliOptions = require('./cliOptions');

async function cli(input) {
  const options = chumpi.io.capture(input, message, cliOptions);
  if (options.console) {
    return options;
  }
  const result = await main(options);
  const dumped = await chumpi.conversion.execute('dump', options.format, result);
  const { filename } = await chumpi.file.write(dumped, options);
  return filename;
}

module.exports = cli;
