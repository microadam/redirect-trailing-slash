module.exports = middleware

function middleware(req, res, next) {
  if (req.url === '/' || !/\/$/.test(req.url)) return next()
  var url = req.url
    .replace(/^\/+/, '/')
    .replace(/\/+$/, '')
  res.redirect(301, url)
}
