const ContactService = require('../service/contact');

module.exports = {
    index: async (ctx, next) => {
        console.log('1');
        await ContactService.index(ctx, next);
        console.log('4');
        // await ctx.render('contact/contact',{
        //     name: 'jims58'
        // });
    },
    listContact: async (ctx, next) => {
        var a = ctx;
    },
    postcontact: async (ctx, next) => {
        let { name, password } = ctx.request.body;
        console.log('1');
        let data = ContactService.postcontact(name, password);
        console.log(data);
        console.log('2');
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