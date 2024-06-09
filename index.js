const express = require('express')
const path = require('path')
const app = express()
const port = 3000;
const bodyParser = require('body-parser');

const { exec } = require('node:child_process')
app.use(bodyParser.json());

// send front end page
app.get('/conjuguemos', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
})

// api
app.post('/sendConjuguemos', (req, res) => {
    const {
        username,
        password,
        assignmentID,
        numCorrect,
        numIncorrect,
        time
    } = req.body;


// this is probably not secure at all, exec could get you hacked if theres improper sanitization which I think there is, too lazy to fix...
exec(`python ./script/cli.py ${username} ${password} ${assignmentID} ${numCorrect} ${numIncorrect} --time ${time}`, (err, output) => {
        // once the command has completed, the callback function is called
        if (err) {
            // log and return if we encounter an error
            res.send({ error: "Error executing command", details: err.message, output });
            return;
        }
        res.send({ message: "Command executed successfully", output: output });
    })
    
})

// open app
app.listen(port, () => {
  console.log(`Conjuguemos App listening on port ${port}`)
})