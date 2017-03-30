import path from 'path'
import assert from 'assert'

import readFile from '../source/readFile'

describe('behaviour of buffered and streamed file reading', () => {

  let bufferedMetrics = { todo: 'fill with metrics from buffered file read' }
  let streamedMetrics = { todo: 'fill with metrics from streamed file read' }

  before(function (done) {

    const bufferedOptions = {
      strategy: 'buffered',
      filepath: path.join(__dirname, '..', 'data', 'book.txt')
    }

    const streamedOptions = {
      strategy: 'streamed',
      filepath: path.join(__dirname, '..', 'data', 'book.txt')
    }

    const queries = [ readFile(bufferedOptions), readFile(streamedOptions) ]
    Promise.all(queries)
      .then(function (results) {
        [ bufferedMetrics, streamedMetrics ] = results
        done()
      })
  })

  it('should produce identical results for streamed and buffered file reads', () => {
    assert.deepEqual(bufferedMetrics, streamedMetrics)
  })

})