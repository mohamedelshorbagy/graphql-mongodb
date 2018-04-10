const { GraphQLObjectType } = require('graphql');

// IMPORT GRAPH USER SCHEMA 
const { addUser, deleteUser } = require('./user/user');


// IMPORT GRAPH POST SCHEMA 
const { addPost } = require('./post/post');



const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: addUser,
        deleteUser: deleteUser,
        addPost: addPost
    }
});


module.exports = mutation;