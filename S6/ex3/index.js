const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const config = require('./config.json');

//Create the mongo client to use
const client = new MongoClient(config.finalUrl);

const app = express();
const port = 1337;

app.use(express.static('public'));
app.use(bodyParser.json());


//Root route
app.get('/', (req, res) => {
    res.status(300).redirect('/info.html');
});

// Return all boardgames from the database
app.get('/boardgames', async (req, res) =>{

    try{
        //connect to the db
        await client.connect();

        //retrieve the boardgame collection data
        const colli = client.db('session5').collection('boardgames');
        const bgs = await colli.find({}).toArray();

        //Send back the data with the response
        res.status(200).send(bgs);
    }catch(error){
        console.log(error)
        res.status(500).send({
            error: 'Something went wrong',
            value: error
        });
    }finally {
        await client.close();
    }
});

// /boardgame?id=1234
app.get('/boardgame', async (req,res) => {
    //id is located in the query: req.query.id
    try{
        //connect to the db
        await client.connect();

        //retrieve the boardgame collection data
        const colli = client.db('session5').collection('boardgames');

        //only look for a bg with this ID
        const query = { bggid: req.query.id };

        const bg = await colli.findOne(query);

        if(bg){
            //Send back the file
            res.status(200).send(bg);
            return;
        }else{
            res.status(400).send('Boardgame could not be found with id: ' + req.query.id);
        }
      
    }catch(error){
        console.log(error);
        res.status(500).send({
            error: 'Something went wrong',
            value: error
        });
    }finally {
        await client.close();
    }
});

// save a boardgame
app.post('/saveBoardgame', async (req, res) => {

    if(!req.body.bggid || !req.body.name || !req.body.genre || !req.body.mechanisms
        || !req.body.description){
        res.status(400).send('Bad request: missing id, name, genre, mechanisms or description');
        return;
    }

    try{
        //connect to the db
        await client.connect();

        //retrieve the boardgame collection data
        const colli = client.db('session5').collection('boardgames');

        // Validation for double boardgames
        const bg = await colli.findOne({bggid: req.body.bggid});
        if(bg){
            res.status(400).send('Bad request: boardgame already exists with bggid ' + req.body.bggid);
            return;
        } 
        // Create the new boardgame object
        let newBoardgame = {
            bggid: req.body.bggid,
            name: req.body.name,
            genre: req.body.genre,
            mechanisms: req.body.mechanisms,
            description: req.body.description
        }
        
        // Insert into the database
        let insertResult = await colli.insertOne(newBoardgame);

        //Send back successmessage
        res.status(201).send(`Boardgame succesfully saved with id ${req.body.bggid}`);
        return;
    }catch(error){
        console.log(error);
        res.status(500).send({
            error: 'Something went wrong',
            value: error
        });
    }finally {
        await client.close();
    }
});



app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
})