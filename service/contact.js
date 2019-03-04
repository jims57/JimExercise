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
        var jsonString = '{"draw":1,"recordsTotal":57,"recordsFiltered":57,"data":[["Airi57","Satou","Accountant","Tokyo","28th Nov 08","$162,700"],["Angelica","Ramos","Chief Executive Officer (CEO)","London","9th Oct 09","$1,200,000"],["Ashton","Cox","Junior Technical Author","San Francisco","12th Jan 09","$86,000"],["Bradley","Greer","Software Engineer","London","13th Oct 12","$132,000"],["Brenden","Wagner","Software Engineer","San Francisco","7th Jun 11","$206,850"],["Brielle","Williamson","Integration Specialist","New York","2nd Dec 12","$372,000"],["Bruno","Nash","Software Engineer","London","3rd May 11","$163,500"],["Caesar","Vance","Pre-Sales Support","New York","12th Dec 11","$106,450"],["Cara","Stevens","Sales Assistant","New York","6th Dec 11","$145,600"],["Cedric","Kelly","Senior Javascript Developer","Edinburgh","29th Mar 12","$433,060"]]}';
        var jsonString = '{"draw":2,"recordsTotal":57,"recordsFiltered":57,"data":[["Airi58","Satou","Accountant","Tokyo","28th Nov 08","$162,700"],["Angelica","Ramos","Chief Executive Officer (CEO)","London","9th Oct 09","$1,200,000"],["Ashton","Cox","Junior Technical Author","San Francisco","12th Jan 09","$86,000"],["Bradley","Greer","Software Engineer","London","13th Oct 12","$132,000"],["Brenden","Wagner","Software Engineer","San Francisco","7th Jun 11","$206,850"],["Brielle","Williamson","Integration Specialist","New York","2nd Dec 12","$372,000"],["Bruno","Nash","Software Engineer","London","3rd May 11","$163,500"],["Caesar","Vance","Pre-Sales Support","New York","12th Dec 11","$106,450"],["Cara","Stevens","Sales Assistant","New York","6th Dec 11","$145,600"],["Cedric","Kelly","Senior Javascript Developer","Edinburgh","29th Mar 12","$433,060"]]}';
        var jsonObject = JSON.parse(jsonString);

        ctx.response.body = jsonString;
        // ctx.resp.end( JSON.stringify(jsonObject));
    }
};
