const staticFiles = require('koa-static');
const path = require('path');

// This middleware is used for loading static files, such as css, images etc.
module.exports = (app, workingFolder) => {
    app.use(staticFiles(path.resolve(workingFolder, './public'),{
        maxage: 30 * 24 * 60 * 60 * 1000
      }));
}
