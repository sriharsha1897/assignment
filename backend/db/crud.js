var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

response = {
    status: "500",
}
function insert(collection_name, myobj) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            response.message = err
        };
        var dbo = db.db("mtdb");
        dbo.collection(collection_name).insertOne(myobj, function (err, res) {
            if (err) { response.message = err }
            else {
                response.message = "1 entry inserted"
            }
            db.close();
            return response;



        });
    });
}


// module.exports = crud;