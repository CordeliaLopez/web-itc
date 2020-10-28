// init project
const express = require("express");
const mongodb = require("mongodb");
const path = require('path');


const port = 4567;

const app = express();
app.use(require("cors")());
app.use(require("body-parser").json());


const uri = "mongodb://corde_lopez:cc5QJbUCEKamxtg@clustercv-shard-00-00.k7xhz.mongodb.net:27017,clustercv-shard-00-01.k7xhz.mongodb.net:27017,clustercv-shard-00-02.k7xhz.mongodb.net:27017/cvdb?ssl=true&replicaSet=atlas-iawxo9-shard-0&authSource=admin&retryWrites=true&w=majority"; // put your URI HERE


mongodb.MongoClient.connect(uri, (err, db) => {
  var dbo = db.db("cvdb");
  const about_collection = dbo.collection("about");

  const contact_collection = dbo.collection("contact");

  const education_collection = dbo.collection("education");

  const work_collection = dbo.collection("work");

  const project_collection = dbo.collection("project");

  app.get("/about", (req, res) => {
    about_collection.find({}, { projection: { _id: 0, about:1}}).toArray((err, abt) => {
      if (err) {
        res.send("Error in GET req.");
      } else {
        console.log(abt)
        res.send(abt);
      }
    });
  });

  app.get("/contact", (req, res) => {
    contact_collection.find({}).toArray((err, ct) => {
      if (err) {
        res.send("Error in GET req.");
      } else {
        console.log(ct)
        res.send(ct);
      }
    });
  });

  app.get("/education", (req, res) => {
    education_collection.find({}).toArray((err, edu) => {
      if (err) {
        res.send("Error in GET req.");
      } else {
        console.log(edu)
        res.send(edu);
      }
    });
  });

  app.get("/work", (req, res) => {
    work_collection.find({}).toArray((err, wk) => {
      if (err) {
        res.send("Error in GET req.");
      } else {
        console.log(wk)
        res.send(wk);
      }
    });
  });

  app.get("/projects", (req, res) => {
    project_collection.find({}).toArray((err, pj) => {
      if (err) {
        res.send("Error in GET req.");
      } else {
        console.log(pj)
        res.send(pj);
      }
    });
  });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
  });

  app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "/style.css"));
  });

  app.get("/me.PNG", (req, res) => {
    res.sendFile(path.join(__dirname, "/me.PNG"));
  });

  // listen for requests
  var listener = app.listen(port, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
});
