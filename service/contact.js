const Sequelize = require('sequelize');
const Contacts = require('../models/contact');

module.exports = {
    index: async (ctx, next) => {
        await ctx.render('contact/contact',{
            userName: 'jims58-8'
        });

        console.log('3');
    },
    listContact: async (ctx, next) => {
        var orderField = 'UserID';

        var contactEntity =  Contacts(ctx.DB, Sequelize);

        await contactEntity.findAll({
            limit: 20,
            attributes: ['UserID', 'Title', 'Name', 'BirthDate', 'IsFavorite'],
            order: [
                [orderField, 'DESC']
            ]
          }).then(contacts => {
            var a = 1;
        
          });

        var a = ctx;
    },
    postcontact: async (ctx, next) => {
        let data;
        data = 'd1';

        let { name, age } = ctx.request.body;

        return data;
    },
    putContact: async (ctx, next) => {
        var a = ctx;
    },
    delContact: async (ctx, next) => {
        var a = ctx;
    },
    handleContact: async (ctx, next) => {
        var drawID = parseInt(ctx.query.draw); // Get old draw number, we have to get different draw ID to update the datagrid
        drawID += 1; // Get up-to-date drawID
        var pageIndex = parseInt(ctx.request.query.start); // Get page index, number from 0 to N
        var pageSize = parseInt(ctx.request.query.length); // Get page size
        var jsonString = '';
        var sqlString = 'select (select count(*) from contact) as totalCount, c.UserID, c.Title, Name, FLOOR(DATEDIFF (NOW(), BirthDate)/365) AS Age, c.IsFavorite As FavoriteFlag, (select count(UserID) from contactdetail where contactdetail.UserID = c.UserID) as ContactDetailCount from contact c limit ' + pageIndex + ', ' + pageSize + '';

        await ctx.DB.query(sqlString, { type: ctx.DB.QueryTypes.SELECT}
        )
        .then(contacts => {
            var contactsString = JSON.stringify(contacts);
            var showTotal = contacts.length; // How many record to be showed in a single page
            var totalCount = 0;

            if(showTotal >0)
            {
                totalCount = contacts[0].totalCount;
            }

            jsonString = '{"draw":'+ drawID +',"recordsTotal":' + showTotal + ',"recordsFiltered":' + totalCount +',"data":'+ contactsString +'}';
        })

        ctx.response.body = jsonString;
    }
};
