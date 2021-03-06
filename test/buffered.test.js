import path from 'path'
import { expect } from 'chai'

import readFile from '../source/readFile'

/* global describe, before, it */
describe('reading a file using a buffered approach', () => {

  let metrics = null

  before(done => {
    const strategy = 'buffered'
    const filepath = path.join(__dirname, '..', 'data', 'data.txt')
    const options = { strategy, filepath }
    readFile(options)
      .then(function (data) {
        metrics = data
        done()
      })
  })

  it('should have found the correct number of words', () => {
    const expectWordCount = 7
    const actualWordCount = Object.keys(metrics).length
    expect(actualWordCount).equal(expectWordCount)
  })

  it('should treat words that differ by case as being the same word', () => {
    const expectWordCount = 3
    const actualWordCount = metrics.apple.count
    expect(actualWordCount).equal(expectWordCount)
  })

  it('should not contain any words of length zero', () => {
    const expectWordCount = 0
    const actualWordCount = Object.keys(metrics).filter(word => word.length === 0).length
    expect(actualWordCount).equal(expectWordCount)
  })

  it('should treat a word with a double-hypen as two separate words', () => {
    const expectWordCount = 6
    const actualWordCount = metrics.banana.count
    expect(actualWordCount).equal(expectWordCount)
  })

  it('should ensure only lowercase letters are present in each of the words', () => {
    const expectWordCount = 0
    const actualWordCount = Object.keys(metrics).filter(word => /[^a-z]/.test(word)).length
    expect(actualWordCount).equal(expectWordCount)
  })

  it('should identify if the count of a word is a prime number', () => {
    const expectWordIsPrime = true
    const actualWordIsPrime = metrics.cucumber.prime
    expect(expectWordIsPrime).to.equal(actualWordIsPrime)
  })

  it('should identify if the count of a word is not a prime number', () => {
    const expectWordIsPrime = false
    const actualWordIsPrime = metrics.banana.prime
    expect(expectWordIsPrime).to.equal(actualWordIsPrime)
  })

  it('should throw exception for invalid file path', function (done) {
    const options = { strategy: 'buffered', filepath: path.join(__dirname, '..', 'data', 'naughty.txt') }
    readFile(options)
      .catch(function (error) {
        expect(error.toString().indexOf('no such file') >= 0).to.be.true
        done()
      })
  })
})
