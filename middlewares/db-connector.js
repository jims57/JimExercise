const Sequelize = require('sequelize');

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

exports.initDB = () => {
    console.log('Trying to connect to MySql...')
    var p = new Promise((resolve, reject) => {
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connected to MySql successfully!')
                resolve(sequelize);
            })
            .catch(err => {
                console.log('Failed to connected to MySql, please try again!')
                reject(err);
            });
    });

    return p
};