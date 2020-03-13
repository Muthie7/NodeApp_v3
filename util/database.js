const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://Mash:zPkEgFVF5GMnVGQP@cluster0-soty2.mongodb.net/test?retryWrites=true&w=majority'
        ,{ useNewUrlParser: true, useUnifiedTopology: true }
    )
        .then(client => {
            console.log("Connected!!");
            _db = client.db() //store a connection to my db in this connection
            callback(client)
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw 'No DB Found!';
}

// module.exports = mongoConnect;
// module.exports = getDb;

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
