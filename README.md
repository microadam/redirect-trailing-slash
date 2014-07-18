# redirect-trailing-slash

Express middleware to redirect URLs with a trailing slash to the same URL without the slash

[![build status](https://secure.travis-ci.org/microadam/redirect-trailing-slash.png)](http://travis-ci.org/microadam/redirect-trailing-slash)

## Installation

```
npm install redirect-trailing-slash --save
```

## Usage

```
  var express = require('express')
  var app = express()
  var redirectTrailingSlash = require('redirect-trailing-slash')

  app.use(redirectTrailingSlash)

  app.listen(3000)
```

## Credits
[Adam Duncan](https://github.com/microadam/)
