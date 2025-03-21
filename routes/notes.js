const fs = require("fs");
const path = require("path");

const noteRoutes = function(app, fs){

    const readFile = function(callback, returnJson = false, filePath = path.join(__dirname, "..", "notes.json"), encoding = "utf8"){
        fs.readFile(filePath, encoding, function(err, data){

            if (err){
                throw err;
            };
            callback (returnJson ? JSON.parse(data) : data);
        });
    }

    const writeFile = function(callback, filePath = path.join(__dirname, "..", "notes.json"),  newData, encoding = "utf8"){
        fs.writeFile(encoding, filePath, newData, function(err){
            
            if (err){
                throw err;
            };
            callback();
        });
    };
 
    app.get("/notes", function(req, res){
        readFile(function(data){
            res.send(data);
        }, true);
    })

    app.post("/notes", function(req, res){
        readFile(function(data){
            // const notes = JSON.parse(data);
            // const newUserId = notes.length ? notes[notes.length - 1].id + 1 : 1;
            const newUserId = Date.now().toString();

            data[newUserId] = req.body;

            writeFile(JSON.stringify(data, null, 2), function(){
                res.status(200).send('new user added');
            });
        }); 

    });
};

module.exports = noteRoutes;