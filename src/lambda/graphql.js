const { ApolloServer, gql } = require('apollo-server-lambda');
const connectToDatabase = require('../db');

require('dotenv').config();

const { Note, User } = require('../models');

// Schema
const typeDefs = gql`
  type Query {
    hello: String
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
    hello: () => 'Hello world!',
    user: (parent, args, context) => User.findById(args.id),
    note: (parent, args, context) => Note.findById(args.id),
    users: (parent, args, context) => User.find(),
    notes: (parent, args, context) => Note.find({ ...args }),
  },
  Mutation: {
    createNote: (parent, args, context) => {
      console.log(args);
      const newNote = new Note({ ...args });
      return newNote.save();
    },
    deleteNote: (parent, args, context) => Note.findByIdAndDelete(args.id),
    updateNote: (parent, args, context) => Note.findByIdAndUpdate(args.id, { ...args.input }, { new: true }),
  },
  // Note: {
  //   user: (parent, args, context) => User.findOne({ _id: parent.userID }),
  // },
  User: {
    notes: (parent, args, context) => Note.find({ userID: parent.id }).sort({ createdAt: -1 }),
  },
};

const server = new ApolloServer({
  typeDefs,
	cors,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ event, context }) => ({
    // context: { ...context, callbackWaitsForEmptyEventLoop: false },
    context,
    event,
    db: await connectToDatabase(),
  }),
});

exports.handler = server.createHandler(
  {
    cors: {
      origin: '*',
      credentials: true,
      allowedHeaders: ['Content-Type'],
    },
  },
);
