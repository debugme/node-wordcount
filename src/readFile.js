import fs from 'fs'
import primes from './primes'

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
        metrics[word] = { count: 1, prime: false }
      }
      return metrics
    }, metrics)
    return metrics
  }, metrics)
  if (metrics[''])
    delete metrics['']
  return metrics
}

const bufferedRead = options => {
  return new Promise(function(resolve, reject) {
    try {
      const text = fs.readFileSync(options.filepath, 'utf-8')
      const metrics = updateMetrics({}, primes, text)
      resolve(metrics)
    } catch (error) {
      reject(error)
    }
  })
}

const streamedRead = options => {
  return new Promise(function(resolve, reject) {
    try {
      const { filepath, highWaterMark = 655360 } = options
      const metrics = {}
      let store = []
      fs.createReadStream(filepath, { highWaterMark })
        .on('data', data => {
          const fragment = data.toString()
          store.push(fragment)
          if (fragment.endsWith(' ')) {
            updateMetrics(metrics, primes, store.join(''))
            store = []
          }
        })
        .on('end', (data) => {
          const text = store.join('')
          updateMetrics(metrics, primes, text)
          resolve(metrics)
        })
        .on('error', error => {
          reject(error)
        })
    } catch (error) {
      reject(error)
    }
  })
}

const readFile = options => {
  if (options.approach === 'buffered')
    return bufferedRead(options)
  else
    return streamedRead(options)
}

export default readFile