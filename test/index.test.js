var assert = require('assert')
  , redirectTrailingSlash = require('../index')

describe('redirect-trailing-slash', function () {

  it('should redirect to page without trailing slash when slash present', function (done) {
    var res =
          { redirect: function (url) {
              assert.equal(url, 'http://mysite.com/my-page')
              done()
            }
          }
    redirectTrailingSlash({ url: 'http://mysite.com/my-page/' }, res)
  })

  it('should not redirect when there is no trailing slash', function (done) {
    var redirectCalled = false
      , res =
          { redirect: function () {
              redirectCalled = true
            }
          }
    redirectTrailingSlash({ url: 'http://mysite.com/my-page' }, res, function () {
      assert.equal(redirectCalled, false, 'redirect should not have been called')
      done()
    })
  })

})
