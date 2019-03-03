const Sequelize = require('sequelize');
const Contacts = require('../models/contact');

module.exports = {
    index: async (ctx, next) => {
        var contactEntity =  Contacts(ctx.DB, Sequelize);
      
        contactEntity.findOne({
          attributes: ['Name']
        }).then(Contact => {
          var a = 1;
      
        })

        await ctx.render('contact/contact',{
            name: 'jims58'
        });

        console.log('3');
    },
    listContact: async (ctx, next) => {
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