var assert = require('assert')
  , redirectTrailingSlash = require('../index')
  , express = require('express')
  , request = require('supertest')

describe('redirect-trailing-slash', function () {

  it('should redirect to page without trailing slash when slash present', function (done) {
    var app = express().use(redirectTrailingSlash)
    request(app)
      .get('/hello/')
      .expect(301)
      .end(function (err, res) {
        if (err) return done(err)
        assert.equal(res.headers.location, '/hello')
        done()
      })
  })

  it('should not redirect when there is no trailing slash', function (done) {
    var app = express()
    app.use(function (req, res, next) {
      res.redirect = function () { done(new Error('res.redirect(str) was called')) }
      redirectTrailingSlash(req, res, next)
    })
    app.get('/hello', function (req, res) { res.send('win!') })
    request(app)
      .get('/hello')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        assert.equal(res.text, 'win!')
        done()
      })
  })

  // Issuing a redirect to a string beginning with // is interpreted by most
  // browsers as a protocol-less absolute URI, which means this middleware could
  // be tricked into redirecting a visitor to a different site – an Open Redirect
  // Vulnerability – https://www.owasp.org/index.php/Open_redirect

  it('should strip excessive leading slashes (plain)', function (done) {
    var app = express().use(redirectTrailingSlash)
    request(app)
      .get('////danger.io/')
      .expect(301)
      .end(function (err, res) {
        if (err) return done(err)
        assert.equal(res.headers.location, '/danger.io')
        done()
      })
  })

  it('should strip excessive leading slashes (url encoded)', function (done) {
    var app = express().use(redirectTrailingSlash)
    request(app)
      .get('/%2F%2Fdanger.io/')
      .expect(301)
      .end(function (err, res) {
        if (err) return done(err)
        assert.equal(res.headers.location, '/%2F%2Fdanger.io')
        done()
      })
  })

  it('should strip excessive leading slashes (unicode literal)', function (done) {
    var app = express().use(redirectTrailingSlash)
    request(app)
      .get('/\u002Fdanger.io/')
      .expect(301)
      .end(function (err, res) {
        if (err) return done(err)
        assert.equal(res.headers.location, '/danger.io')
        done()
      })
  })

  it('should not redirect the root url "/"', function (done) {
    var app = express()
    app.use(function (req, res, next) {
      res.redirect = function () { done(new Error('res.redirect(str) was called')) }
      redirectTrailingSlash(req, res, next)
    })
    app.get('/', function (req, res) { res.send('home slash') })
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        assert.equal(res.text, 'home slash')
        done()
      })
  })

  it('should handle non-word characters preceding a trailing slash', function (done) {
    var app = express()
    app.use(redirectTrailingSlash)
    request(app)
      .get('/./')
      .expect(301)
      .end(function (err, res) {
        if (err) return done(err)
        assert.equal(res.headers.location, '/.')
        done()
      })
  })

})
