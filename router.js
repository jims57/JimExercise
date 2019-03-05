const router = require('koa-router')();
const ContactController = require('./controller/contact');

module.exports = (app) =>{
    router
    .get('/', ContactController.index)
    .get('/countact', ContactController.listContact)
    .post('/contact', ContactController.postcontact)
    .put('/contact', ContactController.putContact)
    .del('/contact/:id', ContactController.delContact)
    //Datagrid related router
    .get('/handleContact', ContactController.handleContact);

    //Load middlewares used in this server
    app
    .use(router.routes()) //Load koa-router middleware
    .use(router.allowedMethods()); //Allow to handle the exception status codes
};