const path = require("path");

const noteRoutes = require (path.join(__dirname, "notes.js"));

const appRouter = function(app, fs){

    app.get("/", function(req, res){
        res.send("Welcome to my api-server");
    });

    noteRoutes(app, fs);
};

module.exports = appRouter;