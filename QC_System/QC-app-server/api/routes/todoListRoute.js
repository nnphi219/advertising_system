'use strict';
var {authenticate} = require('../../middleware/authenticate');

module.exports = function(app) {
    var todoList = require('../controllers/todoListController');

    app.route('/tasks')
        .get(authenticate, todoList.list_all_tasks)
        .post(authenticate, todoList.create_a_task);


    app.route('/tasks/:taskId')
        .get(authenticate, todoList.read_a_task)
        .put(authenticate, todoList.update_a_task)
        .delete(authenticate, todoList.delete_a_task);
};