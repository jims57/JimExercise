const Sequelize = require('sequelize');
const Contacts = require('../models/contact');

module.exports = {
    index: async (ctx, next) => {
        await ctx.render('contact/contact',{
            author: 'Jim Gan',
            GitHubLink: 'https://github.com/jims57/JimExercise'
        });
    },
    listContact: async (ctx, next) => {
        // Todo, future use
    },
    postcontact: async (ctx, next) => {
       // Todo, future use
    },
    putContact: async (ctx, next) => {
       // Todo, future use
    },
    delContact: async (ctx, next) => {
       // Todo, future use
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

        // Get search related info
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

        // Build query string for MySql
        var sqlString = 'select totalCount, UserID, Title, Name, Age, IsFavorite as FavoriteFlag, ContactDetailCount, ContactDetailType, ContactDetailContent from (';
        sqlString += 'select distinct (select count(*) from (select distinct c.UserID from contact c, contactdetail cd where c.UserID = cd.UserID ';
        if(searchText !='')
        {
            sqlString += 'and c.Name like "%' + searchText + '%"';
        }
        sqlString += ') a) as totalCount, c.UserID, c.Title, Name, BirthDate, FLOOR(DATEDIFF (NOW(), BirthDate)/365) AS Age, c.IsFavorite, (select count(UserID) from contactdetail where contactdetail.UserID = c.UserID) as ContactDetailCount, cd.ContactDetailType, cd.ContactDetailContent ';
        sqlString += 'from contact c, contactdetail cd ';
        sqlString +='where c.UserID = cd.UserID '; // Appended where clause

        // When search text is input, meaning query contact's name
        if(searchText !='')
        {
            sqlString +='and c.Name like "%' + searchText + '%" '; // Appended name search clause
        }
        sqlString += ') cc order by cc.' + sortingColName + ' ' + sortingColCondition + ' limit ' + pageIndex + ', ' + pageSize + '';

        // Execute query by db entity
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
