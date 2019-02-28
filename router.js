const router = require('koa-router')();
const ContactController = require('./controller/contact');

module.exports = (app) =>{
    router
    .get('/', ContactController.index)
    .get('/users', ContactController.listContact)
    .post('/users', ContactController.postcontact)
    .put('/users/:id', ContactController.putContact)
    .del('/users/:id', ContactController.delContact)
    .all('/users/:id', ContactController.allContact);

    //Load middlewares used in server
    app
    .use(router.routes()) //Load koa-router middleware
    .use(router.allowedMethods()); //Allow to handle the exception status codes
};