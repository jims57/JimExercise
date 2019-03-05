// Variables needed to run this application
const workingFolder = __dirname;

// Load modules and middlewares
const koa = require('koa');
const app = new koa();
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const templateEngine = require('./middlewares/template-engine');
const resourceProvider = require('./middlewares/resource-provider');
const dbConnector = require('./middlewares/db-connector');

//Use bodyParser middleware
app.use(bodyParser());

// Load custom middlewares
templateEngine(app, workingFolder);
resourceProvider(app, workingFolder);
router(app);

// Init DB connector to MySql
const sequelize = dbConnector.initDB();
sequelize.then((sequelize) =>{
  app.context.DB = sequelize;

  console.log('Trying to launch server, please wait!');

  // Launch server at port 3000
  app.listen(3000,() => {
    console.log('Server is started successfully. Running...');
  });
});