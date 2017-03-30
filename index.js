import fs from 'fs'

import readFile from './source/readFile'

// readFile({ filepath: 'input/input.txt', strategy: 'buffered' })
//   .then(metrics => fs.writeFileSync('./output/one.json', JSON.stringify(metrics, undefined, 2)))

// readFile({ filepath: 'input/input.txt', strategy: 'streamed', highWaterMark: 5 })
//   .then(metrics => fs.writeFileSync('./output/two.json', JSON.stringify(metrics, undefined, 2)))


readFile({ filepath: 'test/data.txt', strategy: 'buffered' })
  .then(metrics => fs.writeFileSync('./output/one.json', JSON.stringify(metrics, undefined, 2)))

readFile({ filepath: 'test/data.txt', strategy: 'streamed', highWaterMark: 1 })
  .then(metrics => fs.writeFileSync('./output/two.json', JSON.stringify(metrics, undefined, 2)))