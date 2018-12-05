const {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential,
} = require('mongodb-stitch-server-sdk');
 
const client = Stitch.initializeDefaultAppClient('tastingnotes-wnnlh');
const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('tastingnotes');


// client.auth.loginWithCredential(new AnonymousCredential())
//     .then(user => console.log(user.id))
//     // .then(() => db.collection('users').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert: true}))
//     // .then(() => db.collection('users').insertOne({owner_id: client.auth.user.id, number: 11}))
//     .then(() => db.collection('users').find().asArray())
//     .then(docs => {
//         console.log("Found docs", docs)
//         console.log("[MongoDB Stitch] Connected to Stitch")
//     }).catch(err => {
//         console.error(err)
// });

const res = () => client.auth.loginWithCredential(new AnonymousCredential())

