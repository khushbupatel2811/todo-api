var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());
// var todos = [{
//     id: 1,
//     description: 'Meet mom for Lunch',
//     completed: false
// }, {
//     id: 2,
//     description: 'Go to market',
//     completed: false
// }, {
//     id: 3,
//     description: 'Pay the Bills',
//     completed: true
// }];

app.get('/', function(req, res) {
    res.send('Todo API root');
});

app.get('/todos', function(req, res) {
    // res.send(JSON.stringify(todos));
    res.json(todos);
});

app.get('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo;
    todos.forEach(function(todo) {
        if (todoId === todo.id) {
            matchedTodo = todo;
        }
    });
    if (matchedTodo) {
        res.json(matchedTodo);
    }
    res.status(404).send({ message: 'Resource NOT Found!'});
    // res.json('Get Single data using id ' + req.params.id);
});

app.post('/todos', function(req, res) {
    var body = req.body;
    body.id = todoNextId++;
    todos.push(body);
    // console.log('description ' + body.description);
    res.json(body);
});

app.listen(PORT, function() {
    console.log('Express listening on port ' + PORT + ' !');
});