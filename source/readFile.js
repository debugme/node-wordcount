import fs from 'fs'
import primes from '../data/primes'

function updateMetrics(metrics, primes, text) {
  const lines = text.toLowerCase().split(/\n/)
  lines.reduce((info, data) => {
    const line = data.replace(/--/g, ' ')
    const tokens = line.split(/\s+/)
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
  return metrics
}

const bufferedRead = options => {
  return new Promise(function (resolve, reject) {
    try {
      const text = fs.readFileSync(options.filepath, 'utf-8')
      const metrics = updateMetrics({}, primes, text)
      delete metrics['']
      resolve(metrics)
    } catch (error) {
      reject(error)
    }
  })
}

const streamedRead = options => {
  return new Promise(function (resolve, reject) {
    const { filepath, highWaterMark = 655360 } = options
    const metrics = {}
    let store = []
    const onData = (data) => {
      const fragment = data.toString()
      store.push(fragment)
      if (fragment.endsWith(' ')) {
        updateMetrics(metrics, primes, store.join(''))
        store = []
      }
    }
    const onEnd = () => {
      const text = store.join('')
      updateMetrics(metrics, primes, text)
      delete metrics['']
      resolve(metrics)
    }
    const onError = (error) => {
      reject(error)
    }
    fs.createReadStream(filepath, { highWaterMark })
      .on('data', onData)
      .on('end', onEnd)
      .on('error', onError)
  })
}

const readFile = options => {
  if (options.strategy === 'buffered')
    return bufferedRead(options)
  else
    return streamedRead(options)
}

export default readFile