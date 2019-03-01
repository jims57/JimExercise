const ContactService = require('../service/contact');

module.exports = {
    index: async (ctx, next) => {
        await ContactService.index(ctx, next);
    },
    listContact: async (ctx, next) => {
        var a = ctx;
    },
    postcontact: async (ctx, next) => {
        let { name, password } = ctx.request.body;
        
        let data = ContactService.postcontact(name, password);
        console.log(data);

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