const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require(path.join(__dirname, "routes", "routes.js"))(app, fs);
const port = 6000;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

// const readData = function(){
//     const data = fs.readFile(__dirname + "/" + "tshirts.json, utf8");
//     return JSON.parse(data); 
// }

// const writeData = function(data){
//     fs.writeFileSync(__dirname + "/" + "tshirts.json", JSON.stringify(data, null, 2), "utf-8");
// };

// Getting the JSON data on the list of Notes on Web Development.

app.get("/notes", function(req, res){
    fs.readFile(__dirname + "/notes.json", "utf8",  function(err, data){
        console.log(data);
        res.send(data);
    });
});

// Getting specific note by id from the list of Notes on Web Development.

app.get("/notes/:id", function(req, res){
    fs.readFile(__dirname + "/notes.json", "utf8",  function(err, data){
        const allNotes = JSON.parse(data);
        const noteId = req.params.id;
        const note = allNotes["note_" + noteId]; 
        
        console.log(note);

        if (note){
            res.send(note);
        }
        else{
            res.status(404).send({message: "note with id " + noteId + " not found"});
        }
    });
});

// Adding new note to the list of Notes on Web Development.

// app.post("/notes", function(req, res){
//     fs.writeFile(__dirname + "/notes.json", "utf-8", function(err, data){
//         const allNotes = JSON.parse(data);
//         const newUser = {
//             "user_4": {
//               "id": req.body.id,
//               "title": req.body.title,
//               "content": req.body.content
//             }
//         };
//         allNotes["user_4"] = newUser["user_4"];
//         console.log(allNotes);
//         res.send(allNotes);
//     })
// });
   
app.delete("/notes/deleteNote/:id", function(req, res){
    fs.readFile(__dirname + "/notes.json", "utf-8", function(err, data){
        const allNotes = JSON.parse(data);
        const id = req.params.id;
        allNotes["user_" + id];
        console.log(allNotes);
        res.send(allNotes);
        allNotes.splice()
    })
});

app.get("/tshirt", (req, res) => {
    res.status(200).send({
        tshirt: "👕",
        size: "xl",
        color: "black"
    });
})

app.post("/tshirt/:id", (req, res) => {
    const {id} = req.params;
    const {logo} = req.body;

    if (!logo){
        res.status(418).send({message: "No logo found, we need a logo"});
    }

    res.send({
        tshirt: "👕 with a logo of " + logo + " and ID of " + id,
    });

})

app.listen(port, function(req, res){
    console.log('It works on http://localhost:' + port );
});
// fetch("tshirts.json").then(function (response) {
//     return response.json();
// }).then(function(obj) {
//     console.log(obj);
// }).catch(function(error){
//     console.error("There's an error!!");
//     console.error(error);
// })