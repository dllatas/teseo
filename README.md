# Teseo
[![CircleCI](https://circleci.com/gh/dllatas/teseo/tree/master.svg?style=svg)](https://circleci.com/gh/dllatas/teseo/tree/master)

Teseo reads a directory that contains a relational db schema defined in several config files. 

Each config file defines a table, therefore it has a property that has a name and another optional 
property in case the table has master tables.

Teseo will provide the order in which the tables should be created in a db to avoid issues around
a detail not having a master.

Teseo is the spanish name for the mythical greek king Theseus. He managed to find his way in the 
Labyrinth, similar to the library finding the order of the files.

### Installation

Nodejs v10.0.0+ is needed. Teseo has not been tested against earlier versions.

#### Git
1. `git clone https://github.com/dllatas/teseo.git`
2. `cd teseo`
3. `npm start`

#### npm

Global flag needed so it can be used as a CLI tool without the need for `npm link`. Discard global flag if it will be used as a module. 

1. `npm i -g teseo`

### Usage

#### Properties
- dir: mandatory. string.
- format: mandatory. string.
- master: optional. default = 'master'. string.
- name: optional. default = 'name'. string.
- output: optional. default = '/tmp/teseo'. string.

#### CLI
```bash
teseo --help

```

#### JS
```javascript
const teseo = require('teseo');

const result = await teseo({
  dir: '/home/db-schema',
  format: 'yaml',
})

```
 
### Contributing
- Clone the repo
- Fetch
- `git checkout release`
- `git checkout -b ${relevant-name}/working`
- code!
- add test to the code!
- Create PR between release and working
- Fix merge conflicts, if any
- Wait for review!

### Roadmap
- Write README for each module
- Support more config files
- Add Babel??? :thinking:

### License
[See License](/LICENSE)

### Project Status
Work in Progress
