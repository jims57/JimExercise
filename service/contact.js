module.exports = {
    index: async (ctx, next) => {
        console.log('2');

        // await ctx.render('common/layout',{
        //     name: 'jims58',
        //     title: 'Jim Title123'
        // });
        //Get contact
        //const { Contact } = require('../model/contact');

        await ctx.render('contact/contact',{
            name: 'jims58'
        });

        console.log('3');
    },
    listContact: async (ctx, next) => {
        var a = ctx;
    },
    postcontact: async (name, pwd) => {
        let data;
        data = 'd1';

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