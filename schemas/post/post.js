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


// LOAD SCHEMA
const Post = require('../../models/post');

// LOAD USER TYPE
const { UserType } = require('../user/user');

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        user: {
            type: UserType
        },
        body: {
            type: GraphQLString
        }

    })
})




const getPost = {
    type: PostType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve(parentValue, args) {
        return Post.findById(args.id).populate('user');
    }
}

const getAllPosts = {
    type: new GraphQLList(PostType),
    resolve(parentValue, args) {
        return Post.find({}).populate('user');
    }
}







// Mutations


const addPost = {
    type: PostType,
    args: {
        body: {
            type: new GraphQLNonNull(GraphQLString)
        },
        user: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve(parentValue, args) {
        const post = new Post({
            body: args.body,
            user: args.user
        });

        const savedPost = await post.save();
        const populatedResult = await Post.findById(savedPost._id).populate('user');

        return populatedResult;
        
    }
}








module.exports = {
    PostType,
    getPost,
    getAllPosts,
    addPost
};





