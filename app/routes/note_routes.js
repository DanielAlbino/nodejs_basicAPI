var objectID = require("mongodb").ObjectID;

module.exports = function (app, db) {
  app.get("/notes/:id", (req, res) => {
    const id = req.params.id;
    const details = { "_id:": new ObjectID(id) };
    db.collection("notes").findOne(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occured" });
      } else {
        res.send(item);
      }
    });
  });

  app.post("/notes", (req, res) => {
    //create a note
    const note = { text: req.body.body, title: req.body.title };
    db.collection("notes").insert(note, (err, result) => {
      if (err) {
        res.send({ error: "An error has occured" });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    const details = { "_id:": new ObjectID(id) };
    db.collection("notes").remove(details, note, (err, item) => {
      if (err) {
        res.send({ error: "An error has occured" });
      } else {
        res.send("Note " + id + " deleted!");
      }
    });
  });

  app.put("/notes/:id", (req, res) => {
    const id = req.params.id;
    const details = { "_id:": new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection("notes").update(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occured" });
      } else {
        res.send(item);
      }
    });
  });
};
