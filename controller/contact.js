const ContactService = require('../service/contact');

module.exports = {
    index: async (ctx, next) => {
        await ContactService.index(ctx, next);
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
        await ContactService.handleContact(ctx, next);
    }
};