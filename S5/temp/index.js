const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:demoehb@cluster0.nwqwf.mongodb.net/web2demo?retryWrites=true&w=majority";
const client = new MongoClient(uri);

client.connect(err => {
  const collection = client.db("session5").collection("boardgames");
  console.log('It works!');
  console.log(Array(collection));
  // perform actions on the collection object
  client.close();
});