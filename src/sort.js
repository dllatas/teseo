const chumpi = require('chumpi');

const logger = chumpi.logger('teseo');

const schema = {
  _name: {
    mandatory: true,
    type: 'string',
  },
  _master: {
    mandatory: false,
    type: 'array',
  },
};

const isParentIncluded = (sorted, master) => {
  for (const p of master) {
    if (!sorted.includes(p)) {
      return false;
    }
  }
  return true;
};

const retrieve = (source, props) => {
  const index = props[0];
  const _source = source[index];
  props.shift();
  if (props.length === 0) {
    return _source;
  }
  if (Array.isArray(_source)) {
    // Get next props items
    return _source.map((s) => {
      if (s[props[0]]) {
        return s[props[0]];
      }
      return s;
    });
  }
  if (!_source) {
    return _source;
  }
  return retrieve(_source, props);
};

const get = (source, props, options = {}) => {
  const { delimiter = '.', mandatory = false } = options;
  const _props = props.split(delimiter);
  const retrieved = retrieve(source, _props);
  if (mandatory && !retrieved) {
    throw new Error(`The id ${props} did not found a value.`);
  }
  return retrieved;
};

const analyzer = (tables, name = 'name', master = 'master') => {
  const analyzed = tables.map(t => ({
    _name: get(t, name, { mandatory: true }),
    _master: get(t, master),
  }));
  return analyzed;
};

const execute = (tables, master = 'master', name = 'name') => {
  logger.info(`Schema to sort has ${tables.length} tables`);
  const analyzed = analyzer(tables, name, master);
  chumpi.validation.enforce(analyzed, schema);

  const sorted = analyzed.filter(t => !t._master).map(t => t._name);
  let unsorted = analyzed.filter(t => t._master);

  if (sorted.length === tables.length) {
    return tables;
  }

  // For each element on unsortedTables, check if its masters have been sorted already
  // Iterate until unsortedTables length is 0 or when stuff cant be sorted or when
  // sortedTables has length == 0
  while (unsorted.length > 0) {
    for (const us of unsorted) {
      // Check if the table depends on itself
      if (us._master.includes(us._name)) {
        // Remove us._name from us.master
        us._master = us._master.filter(m => m !== us._name);
      }

      if (isParentIncluded(sorted, us._master)) {
        // Push element to sorted array
        sorted.push(us._name);
        // Remove element from unsorted
        unsorted = unsorted.filter(u => u._name !== us._name);
      }
    }
  }
  logger.info(`Sorted schema has ${sorted.length} tables`);
  logger.info(`The Sorted schema is ${sorted}`);

  // Return tables content in the sort order
  const sortedSchema = sorted.reduce((acc, table) => {
    // need to loop trough tables and compare the name string against table
    // if it matches, then I push the whole tables instance to acc
    for (const t of tables) {
      if (table === get(t, name, { mandatory: true })) {
        acc.push(t);
      }
    }
    return acc;
  }, []);

  return sortedSchema;
};

module.exports = {
  isParentIncluded,
  execute,
  get,
  analyzer,
};
