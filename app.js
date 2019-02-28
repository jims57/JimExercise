const koa = require('koa');
const app = new koa();
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const nunjucks = require('koa-nunjucks-2');
const path = require('path');

//Use bodyParser middleware
app.use(bodyParser());

//Use nunjucks template engine
app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
      trimBlocks: true
    }
}));

//Use router middleware
router(app);

//Launch server at port 3000
app.listen(3000,() => {
    console.log('Server is running.');
});