const koa = require('koa');
const app = new koa();
const bodyParser = require('koa-bodyparser');
const router = require('./router');

//Use bodyParser middleware
app.use(bodyParser());

//Use router middleware
router(app);

//Launch server at port 3000
app.listen(3000,() => {
    console.log('Server is running.');
});