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
    allContact: async (ctx, next) => {
        var a = ctx;
    }
};


// const { Contact } = require('../model/contact');
const { Op } = require('sequelize');

// async function getAllContacts() {
//     return  Contact.findAndCountAll();
// }