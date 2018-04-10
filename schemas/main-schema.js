const { GraphQLSchema } = require('graphql');

// IMPORT QUERY
const RootQuery = require('./root-query');

// IMPORT MUTATION
const mutation = require('./mutation');


const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});

module.exports = schema;