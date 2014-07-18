module.exports = middleware

// Speeds up page loading times
// http://webdesign.about.com/od/beginningtutorials/f/why-urls-end-in-slash.htm
function middleware(req, res, next) {
  if (/\w+\/$/.test(req.url)) {
    res.redirect(req.url.substr(0, req.url.length - 1))
  } else {
    next()
  }
}
