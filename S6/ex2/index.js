const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const app = express();
const port = 1337;

app.use(express.static('public'));
app.use(bodyParser.json());


//Root route
app.get('/', (req, res) => {
    res.status(300).redirect('/info.html');
});

// Return all boardgames from the file
app.get('/boardgames', async (req, res) =>{
    try{
        //Read the file
        let data = await fs.readFile('data/boardgames.json');
        //Send back the file
        res.status(200).send(JSON.parse(data));
    }catch(error){
        res.status(500).send('File could not be read! Try again later...');
    }
});

// /boardgame?id=1234
app.get('/boardgame', async (req,res) => {
    console.log(req.query.id);
    try{
        // Read the file
        let boardgames = await fs.readFile('data/boardgames.json');
        // Parse from string to an object
        boardgames = JSON.parse(boardgames);
        // Try and find the boardgame with provided id
        let bg = boardgames[req.query.id];

        if(bg){
            //Send back the file
            res.status(200).send(bg);
            return;
        }else{
            res.status(400).send('Boardgame could not be found with id: ' + req.query.id);
        }
      
    }catch(error){
        console.log(error);
        res.status(500).send('File could not be read! Try again later...');
    }
});

// save a boardgame
app.post('/saveBoardgame', async (req, res) => {

    if(!req.body.id || !req.body.name || !req.body.genre || !req.body.mechanisms
        || !req.body.description){
        res.status(400).send('Bad request: missing id, name, genre, mechanisms or description');
        return;
    }

    try{
        // Read the file
        let boardgames = await fs.readFile('data/boardgames.json');
        // Parse from string to an object
        boardgames = JSON.parse(boardgames);

        // Validation for double boardgames
        if(boardgames[req.body.id]){
            res.status(400).send('Bad request: boardgame already exists with id ' + req.body.id);
            return;
        }


        boardgames[req.body.id] = {
            name: req.body.name,
            genre: req.body.genre,
            mechanisms: req.body.mechanisms,
            description: req.body.description,
        }

        //Safe the file
        await fs.writeFile('data/boardgames.json', JSON.stringify(boardgames));

        //Send back successmessage
        res.status(201).send(`Boardgame succesfully saved with id ${req.body.id}`);
        return;
    }catch(error){
        console.log(error);
        res.status(500).send('An error has occured! HELP!');
    }
});



app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
})