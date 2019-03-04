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

        var queryStringArray = ctx.request.querystring.split('&');
        var conditionArray = queryStringArray.filter(function(value) {
            // Get search text
            if(value.indexOf('search%5Bvalue%5D') == 0 ||
               value.indexOf('order%5B0%5D%5Bcolumn%5D') == 0 ||
               value.indexOf('order%5B0%5D%5Bdir%5D') == 0
            ){
                return value;
            }
        });

        var sortingColIndexArray = conditionArray[0].split('=');
        var sortingColConditionArray = conditionArray[1].split('=');
        var searchArray = conditionArray[2].split('=');
        var sortingColIndex = parseInt(sortingColIndexArray[1]);
        var sortingColCondition = sortingColConditionArray[1];
        var searchText = searchArray[1];

        // Get sorting column name
        var sortingColName = 'UserID';
        switch (sortingColIndex)
        {
            case 0:
                sortingColName = 'UserID';
            break;
            case 1:
                sortingColName = 'Title';
            break;
            case 2:
                sortingColName = 'Name';
            break;
            case 3:
                sortingColName = 'BirthDate';
                if(sortingColCondition =='asc')
                {
                    sortingColCondition = 'desc';
                }else{
                    sortingColCondition = 'asc';
                }
            break;
            case 4:
                sortingColName = 'IsFavorite';
            break;
            case 5:
                sortingColName = 'ContactDetailCount';
            break;
            default:
                sortingColName = 'UserID';
        }

        // var sqlString = 'select (select count(*) from contact) as totalCount, c.UserID, c.Title, Name, FLOOR(DATEDIFF (NOW(), BirthDate)/365) AS Age, c.IsFavorite As FavoriteFlag, (select count(UserID) from contactdetail where contactdetail.UserID = c.UserID) as ContactDetailCount from contact c ';

        var sqlString = 'select distinct (select count(*) from (select distinct c.UserID from contact c, contactdetail cd where c.UserID = cd.UserID and c.Name like "%' + searchText + '%") a) as totalCount, c.UserID, c.Title, Name, FLOOR(DATEDIFF (NOW(), BirthDate)/365) AS Age, c.IsFavorite As FavoriteFlag, (select count(UserID) from contactdetail where contactdetail.UserID = c.UserID) as ContactDetailCount, cd.ContactDetailType, cd.ContactDetailContent ';
        sqlString += 'from contact c, contactdetail cd ';
        sqlString +='where c.UserID = cd.UserID '; // Appended where clause

        // When search text is input, meaning query contact's name
        if(searchText !='')
        {
            sqlString +='and c.Name like "%' + searchText + '%" '; // Appended name search clause
        }
        sqlString += 'order by c.' + sortingColName + ' ' + sortingColCondition + ' limit ' + pageIndex + ', ' + pageSize + '';

        await ctx.DB.query(sqlString, { type: ctx.DB.QueryTypes.SELECT })
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
