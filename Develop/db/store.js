// WHERE WE STORE OUR NOTES

const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class STORE {constructor(){
    this.lastID=0
};

read() {
    return readFileAsync(./db/db.json)
    //  UTF8
}

write(note) {

}

getNotes() {

}

addNotes(note) {

}

deleteNotes(id) {

}

};

module.exports = new STORE();