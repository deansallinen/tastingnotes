const { ApolloServer, gql } = require('apollo-server-lambda');
const mongoose = require('mongoose');
const connectToDatabase = require('../db');
const users = require('../../../backend/test-data/users');

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
  // Note: {
  //   user: (parent, args, context) => User.findOne({ _id: parent.userID }),
  // },
  User: {
    notes: (parent, args, context) => Note.find({ userID: parent.id }).sort({ createdAt: -1 }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ event, context }) => ({
    context: { ...context, callbackWaitsForEmptyEventLoop: false },
    event,
    db: await connectToDatabase(),
  }),
});

exports.handler = server.createHandler();
