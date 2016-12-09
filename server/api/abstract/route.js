var auth = require('../../auth/auth');
var config = require('../../config/config');

module.exports = (router, controller) => {
    
    var checkUser = config.auth === false ? [] : [auth.decodeToken(), auth.getFreshUser()];

    router.param('id', controller.params);

    router.route('/')
        .get(controller.get)
        .post(checkUser, controller.post);

    router.route('/:id')
        .get(controller.getOne)
        .put(checkUser, controller.put)
        .delete(checkUser, controller.delete);
};