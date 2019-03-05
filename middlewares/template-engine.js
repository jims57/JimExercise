const nunjucks = require('koa-nunjucks-2');
const path = require('path');

// This middleware is used for html rendering with template engine
module.exports = (app, workingFolder) => {
    app.use(nunjucks({
        ext: 'html',
        path: path.join(workingFolder, 'views'),
        nunjucksConfig: {
          trimBlocks: true
        }
    }));
};
