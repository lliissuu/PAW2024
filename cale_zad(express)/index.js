var express = require("express")
var app = express()
const url = require("url")
const fs = require("node:fs");
const mimeType = require("mime-types");

var json = fs.readFileSync(__dirname + '/data.json');

var html1 = '<h1>    Dobry Dzien    </h1>'

var html2 = fs.readFileSync(__dirname + '/index.html');

app.get("/",(req,res) => {
    res.end("Strona Główna")
})

app.get("/json",(req,res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(json);
})

app.get("/html",(req,res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html1);
})

app.get("/html2",(req,res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html2);
})

app.get("/getParams",(req,res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    let content = JSON.stringify(req.query)
    fs.writeFile(
        "params_"+Date.now()+".json",
        content , err => {
            if(err){
                console.error(err)
            }
        }
    )
    res.end(content);
})

app.use((req,res) => {
    var pathName = req.path.replace("/","")
    var files = fs.readdirSync("./assets")
    var found = false;
    for (const file of files){
        if(pathName === file){
            var mime = mimeType.lookup(pathName)
            res.writeHead(200,{"Content-Type": mime});
            var downloadedFile = fs.readFileSync("./assets/" + file)
            res.end(downloadedFile);
            found = true;
        }
    }
    res.writeHead(200,{"Content-Type": "application/json"});
    res.end(fs.readFileSync("./assets/404.json"));
})


app.listen(8080,"127.0.0.1")