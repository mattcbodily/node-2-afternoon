const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const massive = require('massive');
const ctrl = require('./products_controller')

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
.then(db => app.set('db', db))
.catch(err => console.log(`Error!`, err))

app.get(`/api/products`, ctrl.getAll);

app.get(`/api/products/:id`, ctrl.getOne);

app.put(`/api/products/:id`, ctrl.update);

app.post(`/api/products`, ctrl.create);

app.delete(`/api/products/:id`, ctrl.delete);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})