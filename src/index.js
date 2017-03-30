import fs from 'fs'

import readFile from './readFile'

readFile({ filepath: 'test/book.txt', strategy: 'buffered' })
  .then(metrics => fs.writeFileSync('./output/one.json', JSON.stringify(metrics, undefined, 2)))

readFile({ filepath: 'test/book.txt', strategy: 'streamed' })
  .then(metrics => fs.writeFileSync('./output/two.json', JSON.stringify(metrics, undefined, 2)))