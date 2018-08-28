let weather = require('../src/actions/weather.js');
var chai = require('chai')
  , assert = chai.assert
  , should = chai.should();
// const assert =  require('chai').assert//require('assert');
// const should = require ('chai').should();

describe('weather', () => {
  it('should return Austin weather if no param is provided', () => {
    // const params = omit(payload, ['username', 'password']);
    return weather
    .main({})
    .then((result) => {
      console.log("RESULT", result)
      result.body.should.have.property('temp')
    })
  })

    it('should return real weather if location is provided', () => {
      // const params = omit(payload, ['username', 'password']);
      return weather
      .main({location: "Maine"})
      .then((result) => {
        result.body.should.have.property('temp')
      })
    })
})
