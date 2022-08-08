const fs = require("fs");
const markov = require("./kenmarkov");
const axios = require("axios");
const process = require("process");


function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path) {
    fs.readFile(path, "utf8", function cb(err, data) {
        if (err) {
            console.error(`cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

async function makeURLText(url) {
    let resp;

    try {
        resp = await axios.get(url);
    } catch (err) {
        console.error (`cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }

    generateText(resp.data)
}

let [method, path] = process.argv.slice(2);
//process.argv is an array of command-line arguments given to start this program

if (method === "file") {
    makeText(path);
}

else if (method === "url") {
    makeURLText(path);
}

else {
    console.error(`unknown method: ${method}`);
    process.exit(1)
}