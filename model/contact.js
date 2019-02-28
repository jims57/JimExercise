//Define model
const Contact = sequelize.define('contact', {
    UserID: Sequelize.INTEGER,
    Title: Sequelize.STRING,
    Name: Sequelize.STRING,
    BirthDate: Sequelize.DATE,
    IsFavorite: Sequelize.INTEGER
});