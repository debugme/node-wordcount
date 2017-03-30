import fs from 'fs'

import readFile from './readFile'

readFile({ filepath: 'data/book.txt', strategy: 'buffered' })
  .then(metrics => fs.writeFileSync('./output/buffered.json', JSON.stringify(metrics, undefined, 2)))

readFile({ filepath: 'data/book.txt', strategy: 'streamed' })
  .then(metrics => fs.writeFileSync('./output/streamed.json', JSON.stringify(metrics, undefined, 2)))
