// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('expedia', 'root', 'ABC123456', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connected');
//     })
//     .catch(err => {
//         console.error('Connect failed');
//     });
// const Sequelize = require('sequelize');

function SequelizeHelper() {
    const Sequelize = require('sequelize');
    const sequelize;

    this.init = ()=>{
        
        //Aliyun mySql
        sequelize = new Sequelize('expedia', 'root', 'ABC123abc123', {
            host: 'rm-rj9w7v7837kx122z6po.mysql.rds.aliyuncs.com',
        
        //Local mySql
        // const sequelize = new Sequelize('expedia', 'root', 'ABC123456', {
        //     host: 'localhost',
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
    
        //this.sequelize = sequelize;
    }

    this.querySql = (sqlString) => {
        // sequelize.query(sqlString, { type: this.sequelize.QueryTypes.SELECT})
        sequelize.query(sqlString, { type: Sequelize.QueryTypes.SELECT})
        .then(users => {
            var u = users;
            // let{}
        })
    }
};

module.exports = SequelizeHelper();





