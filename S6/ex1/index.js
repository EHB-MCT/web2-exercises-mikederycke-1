const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs/promises')
const app = express()
const port = 3000

//Make sure the files from the folder public are available
app.use(express.static('public'));

//Parse all incoming body requests to JSON if possible
app.use(bodyParser.json());


app.get('/', (req, res) => {
    //redirect the root to the info page. 
    res.redirect('/info.html');
})

app.get('/api/exampleData', (req, res) => {
    let data = {
        count: 5,
        exampleData:[
            {id: 1, name: 'Mike'},
            {id: 2, name: 'Peter'},
            {id: 3, name: 'Joni'},
            {id: 4, name: 'Dennis'},
            {id: 5, name: 'Jan'},
        ]
    }
    // Send back JSON data
    res.send(data);
});

app.post('/api/saveData', async (req, res) => {
    
    //Check if the data is present
    if(!req.body.id || !req.body.name || !req.body.hobby){
        res.status(400).send('The body has a wrong format. It needs to contain 3 properties: id, name and hobby');
        //stop the function here
        return;
    }else{
        //Add to the file
        let filedata = JSON.parse( await fs.readFile('./data/students.json'));
          
        // Validation for duplicate data: no same ID's
        if(filedata.list.find(student => student.id == req.body.id)){
            //student already exists
            res.status(401).send('This student already exists. Make sure you pass along the correct id!');
            //stop the function here
            return;
        }
        // Pass along only the fields we need to prevent pollution of data
        let data = {
            id: req.body.id,
            name: req.body.name,
            hobby: req.body.hobby
        }

        //adjust the file
        filedata.count++;
        filedata.list.push(data);

        //save the file again
        try{
           let result = await fs.writeFile('./data/students.json', JSON.stringify(filedata));
           res.status(201).send('Your data has been succesfully saved with id: ' + req.body.id);
        }catch(error){
            res.status(500).send('Something went wrong: ' + JSON.stringify(error));
        }     

        
    }
    //stop the function here
    return;
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});