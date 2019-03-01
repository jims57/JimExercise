const workingFolder = __dirname;

const koa = require('koa');
const app = new koa();
const bodyParser = require('koa-bodyparser');
const router = require('./router');
// const nunjucks = require('koa-nunjucks-2');
const templateEngine = require('./middlewares/template-engine');
const path = require('path');

//Use bodyParser middleware
app.use(bodyParser());

templateEngine(app, workingFolder);

//Use koa-static middleware
const staticFiles = require('koa-static');
app.use(staticFiles(path.resolve(__dirname, './public'),{
  maxage: 30 * 24 * 60 * 60 * 1000
}));

//Use router middleware
router(app);

const Sequelize = require('sequelize');
//Aliyun mySql
const sequelize = new Sequelize('expedia', 'root', 'ABC123abc123', {
    host: 'rm-rj9w7v7837kx122z6po.mysql.rds.aliyuncs.com',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000
    }
});

sequelize
  .authenticate()
  .then(() => {
      console.log('Connected');
  })
  .catch(err => {
      console.error('Connect failed');
  });

  const Contacts = require('./models/contacts');
  var cons =  Contacts(sequelize, Sequelize);

  cons.findOne({
    attributes: ['Name']
  }).then(Contact => {
    var a = 1;

  })

//Launch server at port 3000
app.listen(3000,() => {
    console.log('Server is running.');
});