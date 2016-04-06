module.exports = middleware

function middleware(req, res, next) {
  if (!/\w+\/$/.test(req.url)) return next()
  var url = req.url
    .replace(/^\/+/, '/')
    .replace(/\/$/, '')
  res.redirect(url)
}
