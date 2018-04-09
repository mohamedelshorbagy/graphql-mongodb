const express = require('express');
const cors = require('cors');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const morgan = require('morgan');
// CONFIG FILE
const config = require('./config');
// IMPORT SCHEMA


const app = express();




// MONGODB Connection MiddleWare
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Database Connected Successfully');
});




// MIDDLEWARES
app.use(morgan('dev'))
app.use(cors());


// Entry Point For GraphQL
// # IMPORTING SCHEMAS
const { UserSchemaModel } = require('./schemas/user');
const { PostSchemaModel } = require('./schemas/post');

// # End Points
app.use('/graphql/user', expressGraphQL({
    schema: UserSchemaModel,
    graphiql: true
}));
app.use('/graphql/post' , expressGraphQL({
    schema: PostSchemaModel,
    graphiql: true
}))



app.listen(config.port, () => {
    console.log('Application is Running in Port ' + config.port);
});