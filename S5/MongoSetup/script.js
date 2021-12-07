//CommonJS require
const { MongoClient } = require("mongodb");
// ESM import style
// import * as MongoClient from 'mongodb';

// create a config.json file with your personal connection url.
// This way your private credentials are hidden. Do not commit your config to your git repo. 
// You can adjust mine with dummy data and create a copy
const config = require("./config.json");
//Boardgame data to insert
const boardgame = require("./tapestry.json");

const client = new MongoClient(config.finalUrl);

async function run() {
    try {
        // Create the connection
        await client.connect();
        console.log("Connected correctly to server");

        //Get the correct collection to do actions on. We use 'boardgames'
        const colli = client.db('session5').collection('boardgames');

        //Retrieving all boardgames from the DB
        const boardgames = await colli.find({}).toArray();
        
        //Inserting a new boardgame, Tapestry, imported at the beginning of the script.
        const insertResult = await colli.insertOne(boardgame);
        console.log(`Inserted the following game: ${JSON.stringify(insertResult)}`);

        // Insert something bad to update and delete
        const badBoardgame = {
            name: "monopoly",
            genre: "strategy",
        }
        await colli.insertOne(badBoardgame);

        // Update the boardgame genre
        const updateResult = await colli.updateOne({name: "monopoly"}, {$set: {genre: "luck"}});
        console.log(`Updated the monopoly: ${JSON.stringify(updateResult)}`);

        // Delete the monopoly boardgame. Commented to test all the above code
        // const deleteResult = await colli.deleteMany({ name: "monopoly" });
        // console.log('Deleted documents =>', deleteResult);      

    } catch (err) {
        console.log(err.stack);
    }

    finally {

        await client.close();

    }

}

run().catch(console.dir);