const schema = {
  dir: {
    mandatory: true,
    type: 'string',
    cli: ['-d', '--dir'],
  },
  format: {
    mandatory: true,
    type: 'string',
    cli: ['-f', '--format'],
  },
  master: {
    mandatory: false,
    type: 'string',
    cli: ['-m', '--master'],
  },
  name: {
    mandatory: false,
    type: 'string',
    cli: ['-n', '--name'],
  },
  output: {
    mandatory: false,
    type: 'string',
    cli: ['-o', '--output'],
  },
};

module.exports = schema;
