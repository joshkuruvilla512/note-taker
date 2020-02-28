// WHERE WE STORE OUR NOTES

const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class STORE {
    constructor() {
        this.lastID = 0
    };

    read() {

        return readFileAsync("/db/db", "utf8");
    }

    write(note) {
        return writeFileAsync("/db/db", JSON.stringify(note))
    }

    getNotes() {
        return this.read()
        .then(notes => {
            let parseNotes;
            
                try {
                    
                    parseNotes = [].concat(JSON.parse(notes));
                }
                catch (err) {
                    parseNotes = [];
                }
                return parseNotes;
            
        }) 
        }
    };

   
module.exports = new STORE();