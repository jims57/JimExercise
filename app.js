const workingFolder = __dirname;

const koa = require('koa');
const app = new koa();
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const templateEngine = require('./middlewares/template-engine');
const resourceProvider = require('./middlewares/resource-provider');
const dbConnector = require('./middlewares/db-connector');
const Sequelize = require('sequelize');

//Use bodyParser middleware
app.use(bodyParser());

// Load custom middlewares
templateEngine(app, workingFolder);
resourceProvider(app, workingFolder);
// const staticFiles = require('koa-static');
// const path = require('path');
// app.use(staticFiles(path.resolve(workingFolder, './public'),{
//   maxage: 30 * 24 * 60 * 60 * 1000
// }));

// module.exports = (app, workingFolder) => {
//     app.use(staticFiles(path.resolve(workingFolder, './public'),{
//         maxage: 30 * 24 * 60 * 60 * 1000
//       }));
// }


//Use router middleware
router(app);

const sequelize = dbConnector.initDB();
sequelize.then((sequelize) =>{
  app.context.DB = sequelize;

  console.log('Trying to launch server, please wait!');

  app.listen(3000,() => {
    console.log('Server is started successfully. Running...');
  });
});