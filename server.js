const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://tylerdthiel:smiler710@cluster0.msxsm.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')

        app.use(bodyParser.urlencoded({extended: true}))

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html')
        })

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then (result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.listen(3000, function() {
            console.log('listening on 3000')
        })
    })
    .catch(error => console.error(error))

console.log('May Node by with you')