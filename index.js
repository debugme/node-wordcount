const fs = require('fs')
const primes = require('./primes.json')
const NanoTimer = require('nanotimer')

function updateMetrics(metrics, primes, text) {
  const lines = text.toLowerCase().split(/\n/)
  lines.reduce((info, data) => {
    const line = data.replace(/--/g, ' ')
    const tokens = line.split(/[\s+]/)
    tokens.reduce((metrics, token) => {
      const word = token.replace(/[^a-z]+/g, '')
      if (metrics[word]) {
        metrics[word].count++
        metrics[word].prime = primes[metrics[word].count] || false
      } else {
        metrics[word] = { count: 0, prime: false }
      }
      return metrics
    }, metrics)
    return metrics
  }, metrics)
}

const approachOne = function (callback) {
  const metrics = {}
  const text = fs.readFileSync('input/input.txt', 'utf-8')
  updateMetrics(metrics, primes, text)
  delete metrics['']
  fs.writeFileSync('./output/one.json', JSON.stringify(metrics, undefined, 2))
  callback()
}

const approachTwo = function (callback) {
  var metrics = {}
  fs.createReadStream('input/input.txt', { highWaterMark: 655360 })
    .on('data', buffer => updateMetrics(metrics, primes, buffer.toString()))
    .on('end', () => { delete metrics['']; fs.writeFileSync('./output/two.json', JSON.stringify(metrics, undefined, 2)); callback() })
}

new NanoTimer().time(approachOne, '', 's', time => console.log(`Synchronous Approach took ${time} seconds`))
new NanoTimer().time(approachTwo, '', 's', time => console.log(`Asynchronous Approach took ${time} seconds`))






