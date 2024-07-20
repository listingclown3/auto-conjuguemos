const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { exec } = require('child_process')

const app = express()

const port = 3000
const subDirectoryName = 'conjuguemos'

app.use(bodyParser.json())

// send HTML page
app.get(`/${subDirectoryName}`, (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
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


exec(`python ./script/cli.py ${username} ${password} ${assignmentID} ${numCorrect} ${numIncorrect} --time ${time}`, (err, output) => {
        // once the command has completed, the callback function is called
        if (err) {
            // log and return if we encounter an error
            res.send({ error: "Error executing command", details: err.message, output })
            return;
        }
        res.send({ message: "Command executed successfully", output: output })
    })
    
})

// open app
app.listen(port, () => {
  console.log(`A U T 0 - C 0 N J U G U 3 M 0 S \n ACTIVE [ ✓ ]\n PORT [ ${port} ]\n LISTENING [ /${subDirectoryName} ]`)
})
