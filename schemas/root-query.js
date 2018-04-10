const { GraphQLObjectType } = require('graphql');



// IMPORT GRAPH USER SCHEMA 
const { getUser, getAllUsers } = require('./user/user');

// IMPORT GRAPH POST SCHEMA
const { getPost, getAllPosts } = require('./post/post');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        User: getUser,
        Users: getAllUsers,
        Post: getPost,
        Posts: getAllPosts
    }
});



module.exports = RootQuery