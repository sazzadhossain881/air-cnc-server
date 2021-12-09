const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

require('dotenv').config();


console.log(process.env.DB_USER);





const fileUpload = require('express-fileupload');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d8lqi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;



const app = express();
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());


app.get('/', (req, res) => {
    res.send('air cnc server successfully runnin');
})




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const experienceCollection = client.db("air-cnc").collection("experience");
    const homesCollection = client.db("air-cnc").collection("homes");
    const homeDetailsCollection = client.db("air-cnc").collection("homeDetails");





    app.post('/addExperience', (req, res) => {
        const experience = req.body;
        experienceCollection.insertMany(experience)
            .then((result) => {
                res.send(result.insertedCount)
            })
    })

    app.get('/getExperience', (req, res) => {
        experienceCollection.find({})
            .toArray((error, documents) => {
                res.send(documents)
            })
    })

    app.post('/addHomes', (req, res) => {
        const home = req.body;
        homesCollection.insertMany(home)
            .then(result => {
                res.send(result.insertedCount)
            })

    })

    app.get('/getHomes', (req, res) => {
        homesCollection.find({})
            .toArray((error, documents) => {
                res.send(documents)
            })
    })

    app.post('/addHomeDetails', (req, res) => {
        const details = req.body;
        homeDetailsCollection.insertMany(details)
            .then(result => {
                res.send(result.insertedCount)
            })

    })

    app.get('/getHomeDetails', (req, res) => {
        homeDetailsCollection.find({})
            .toArray((error, documents) => {
                res.send(documents)
            })
    })

    // app.get('/homeDetails/:key', (req, res) => {
    //     const key = req.params.key;
    //     homeDetailsCollection.find({ key })
    //         .toArray((error, documents) => {
    //             res.send(documents[0])
    //         })
    // })











    console.log('database connected');
});














app.listen(process.env.PORT || 5000);