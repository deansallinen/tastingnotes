// db.js
const mongoose = require('mongoose');

const connection = {};
const URI = 'mongodb+srv://dean:7rNxmsmN4m7VqeT@cluster0-2y6kf.gcp.mongodb.net/test?retryWrites=true';

module.exports = async () => {
  if (connection.isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  console.log('=> using new database connection');
  const db = await mongoose.connect(
    'mongodb+srv://dean:7rNxmsmN4m7VqeT@cluster0-2y6kf.gcp.mongodb.net/test?retryWrites=true',
    {
      // Buffering means mongoose will queue up operations if it gets
      // disconnected from MongoDB and send them when it reconnects.
      // With serverless, better to fail fast if not connected.
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // and MongoDB driver buffering
      useNewUrlParser: true,
    },
  );

  connection.isConnected = db.connections[0].readyState;
};
