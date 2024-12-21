const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const database  = require('./database');

let header = fs.readFileSync(__dirname + '/views/header.html', 'utf8');
let footer = fs.readFileSync(__dirname + '/views/footer.html', 'utf8');
let main = fs.readFileSync(__dirname + '/views/index.html', 'utf8');
let onas = fs.readFileSync(__dirname + '/views/onas.html', 'utf8');
let oferta = fs.readFileSync(__dirname + '/views/oferta.html', 'utf8');
let kontakt = fs.readFileSync(__dirname + '/views/kontakt.html', 'utf8');

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,"static")))


app.get('/', (req, res) => {
    res.contentType('text/html');
    res.write(header)
    res.write(main);
    res.write(footer);
    res.end()
})

app.get('/o-nas', (req, res) => {
    res.contentType('text/html');

    res.write(header)
    res.write(onas);
    res.write(footer);
    res.end()
})

app.get("/oferta",(req, res) => {
    res.contentType('text/html');
    res.write(header)
    res.write(oferta)
    res.write(footer)
    res.end()
})


app.get('/kontakt', (req, res) => {
    res.contentType('text/html');
    res.write(header)
    res.write(kontakt)
    res.write(footer)
    res.end()
})

app.post('/kontakt', (req, res) => {
    console.log(req.body);
    res.redirect("/")
})

app.get('/api/contact-messages', async (req, res) => {

    var messages = await database.getAllMessages()
    res.contentType('application/json');
    res.write(JSON.stringify(messages));
    res.end()
})

app.get('/api/contact-messages/:id', async (req, res) => {
    var message = await database.getMessageById(req.params.id)
    if(message){
        res.status(200)
        res.header('Content-type', 'application/json');
        res.send(message)
    }else{
        res.status(404)
        res.header('Content-type', 'text/html');
        res.send("404 - Page not Found")
    }
    res.end()
})

app.listen(8080, () => {})