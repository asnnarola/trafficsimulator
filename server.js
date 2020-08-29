
// const express = require('express')
// const history = require('connect-history-api-fallback')
// const serveStatic = require('serve-static')
// const path = require('path')
// const app = express()
// app.use(history())
// app.use(serveStatic(path.join(__dirname, 'dist')))
// const port = process.env.PORT || 8080
// app.listen(port)


const express = require('express');
const app = express();
const port = 80;
// for Angular
app.use(express.static('dist/'));
// or for Vue.js
// app.use(express.static('dist/'));
app.listen(port, () => console.info(`Server running on port ${port}`));


const buildLocation = 'dist/';
app.use((req, res, next) => {
  if (!req.originalUrl.includes(buildLocation)) {
    res.sendFile(`${__dirname}/${buildLocation}/index.html`);
  } else {
    next();
  }
});
