// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const store = require("../db/store");
const router = require("express").Router();
const db = require("../db/db");
const fs = require("fs");




// ===============================================================================
// ROUTING
// ===============================================================================

// API GET Requests
// Below code handles when users "visit" a page.
// In each of the below cases when a user visits a link
// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
// ---------------------------------------------------------------------------

//   GET API notes 
router.get("/api/notes", function (req, res) {
    res.json(db);
});


// API POST Requests
// Below code handles when a user submits a form and thus submits data to the server.
// In each of the below cases, when a user submits form data (a JSON object)
// ...the JSON is pushed to the Routerropriate JavaScript array
// (ex. User fills out a reservation request... this data is then sent to the server...
// Then the server saves the data to the tableData array)
// ---------------------------------------------------------------------------

router.post("/api/notes", function (req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    let dbJsonPath = path.join(__dirname, "../db/db");
    let newNote = req.body;
    let highestID = 20;

    for (let index = 0; index < db.length; index++) {
        const singleNote = db[index];

        if (singleNote.id > highestID) {
            highestID = singleNote.id;
        }
    }
    // If you want to get a new id for the new note, it is the highest current id + 1
    newNote.id = highestID + 1;
    db.push(newNote)
    // ---------------------------------------------------------------------------
    fs.writeFile(dbJsonPath, JSON.stringify(db), function name(err) {
        if (err) {
            return console.log(err);
        }
        console.log("You saved a note!");
    });

    res.json(newNote);
});


router.delete("/api/notes/:id", function (req, res) {
    let dbJsonPath = path.join(__dirname, "../db/db");
    for (let index = 0; index < db.length; index++) {
        const note = db[index];
        if (note.id == req.params.id) {
            db.splice(index, 1);
            break;
        }


    }
    fs.writeFile(dbJsonPath, JSON.stringify(db))
})

module.exports = router;

