const {
    ApolloServer,
    gql
} = require('apollo-server-lambda');

const mongoose = require('mongoose');
// const {
//     Stitch,
//     RemoteMongoClient,
//     AnonymousCredential,
// } = require('mongodb-stitch-server-sdk');
// const connectToDatabase = require('../db');

// require('dotenv').config(); TODO

const URI = 'mongodb+srv://dean:7rNxmsmN4m7VqeT@cluster0-2y6kf.gcp.mongodb.net/test?retryWrites=true';
// let db = null;

// if (db == null) {
//   console.log('=> using new database connection');
//   db = mongoose.createConnection(URI, {
//     // Buffering means mongoose will queue up operations if it gets
//     // disconnected from MongoDB and send them when it reconnects.
//     // With serverless, better to fail fast if not connected.
//     bufferCommands: false, // Disable mongoose buffering
//     bufferMaxEntries: 0, // and MongoDB driver buffering
//     useNewUrlParser: true,
//   });
//   const noteSchema = new mongoose.Schema(
//     {
//       userID: String,
//       note: String,
//     },
//     { timestamps: true },
//   );

//   const userSchema = new mongoose.Schema({
//     name: String,
//   });
//   db.model('User', userSchema);
//   db.model('Note', noteSchema);
// }

// const User = db.model('User');
// const Note = db.model('Note');

// const { Note, User } = require('../models');

const setupUserModel = (mongo) => { // TODO maybe combine with Notes model here

    const userSchema = new mongoose.Schema({
        name: String,
    });

    const User = mongo.model('User', userSchema);

    return {
        User
    };
}

const setupNoteModel = (mongo) => {

    const noteSchema = new mongoose.Schema({
        userID: String,
        note: String,
    }, {
        timestamps: true
    })

    const Note = mongo.model('Note', noteSchema);

    return {
        Note
    };
}


// Schema
const typeDefs = gql `
  type Query {
    hello: [User]
    user(id: ID): User
    note(id: ID): Note
    users: [User]
    notes(userID: String): [Note]
  }
  type Mutation {
    createNote(note: String, userID: String): Note
    updateNote(id: ID, input: NoteInput): Note
    deleteNote(id: ID): Note
    # createUser
    # updateUser
    # deleteUser
  }
  type User {
    id: ID
    name: String
    notes: [Note]
  }
  type Note {
    id: ID
    userID: String
    note: String
    createdAt: String
    updatedAt: String
  }
  input NoteInput {
    note: String
    userID: String
  }
`;

// Resolvers
const resolvers = {
    Query: {
        hello: async (parent, args, context) => await context.User.find(),
        user: async (parent, args, context) => await context.User.findById(args.id),
        note: async (parent, args, context) => await context.Note.findById(args.id),
        users: async (parent, args, context) => await context.User.find(),
        notes: async (parent, args, context) => await context.Note.find({ ...args}),
    },
    Mutation: {
        createNote: (parent, args, context) => {
            const Note = context.Note
            console.log(args);
            const newNote = new Note({ ...args});
            return newNote.save();
        },
        deleteNote: async (parent, args, context) => {
            console.log(args)
            const res = await context.Note.findByIdAndDelete(args.id)
            console.log(res)
        }, // TODO
        updateNote: async (parent, args, context) => await context.Note.findByIdAndUpdate(args.id, { ...args.input
        }, { new: true }), // TODO
    },
    // Note: {
    //   user: (parent, args, context) => User.findOne({ _id: parent.userID }),
    // },
    User: {
        notes: async (parent, args, context) => await context.Note.find({
            userID: parent.id
        }).sort({
            createdAt: -1
        }), // TODO
    },
};

let mongo; // TODO cleanup

const server = new ApolloServer({
    typeDefs,
    // cors: true, // TODO find out if needed
    resolvers,
    introspection: true,
    playground: true,
    context: async(context, event) => {
        if (!mongo) {
            console.log('==> Using new connection.')
            mongo = await mongoose.createConnection(URI,{
                bufferCommands: false, // Disable mongoose buffering
                bufferMaxEntries: 0, // and MongoDB driver buffering
                useNewUrlParser: true,
            });
            return {
                ...context,
                // callbackWaitsForEmptyEventLoop: false,
                // conn: await client.auth.loginWithCredential(new AnonymousCredential())
                ...setupUserModel(mongo),
                ...setupNoteModel(mongo)
            }
        }
        // if (!client){
        //     client = Stitch.initializeDefaultAppClient('tastingnotes-wnnlh');
        //     db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('tastingnotes');
        // }
        console.log('==> Using existing connection.')
        return {
            ...context,
            User: mongo.model('User'),
            Note: mongo.model('Note')
        }


    },
});

exports.handler = server.createHandler(
    // {
    //   cors: { // TODO find out if needed
    //     origin: '*',
    //     credentials: true,
    //     allowedHeaders: ['Content-Type'],
    //   },
    // },
);
