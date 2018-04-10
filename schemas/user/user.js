const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLID
} = require('graphql');


const User = require('../../models/user');


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        }

    })
})

// QUERIES
const getUser = {
    type: UserType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve(parentValue, args) {
        return User.findById(args.id);


    }
}


const getAllUsers = {
    type: new GraphQLList(UserType),
    resolve(parentValue, args) {
        return User.find({});
    }

}


// MUTATIONS
const addUser = {
    type: UserType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        age: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve(parentValue, args) {
        const userObject = {
            name: args.name,
            email: args.email,
            age: args.age,
        }
        const user = new User(userObject);

        return user
            .save();

    }
}


const deleteUser = {
    type: UserType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(parentValue, args) {
        return User.remove({ _id: args.id });
    }

}



module.exports = {
    UserType,
    getUser,
    getAllUsers,
    addUser,
    deleteUser
};