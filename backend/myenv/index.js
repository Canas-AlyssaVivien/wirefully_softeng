const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST, GET", "PUT"],
    credentials: true,
}));

app.post('/process-data', (req, res) => {
    console.log("HERE");
    const inputData = req.body.inputData;

    const pythonProcess = spawn('python', ['C:/Users/Alyssa Vivien/NodeJSProjects/wirefully_softeng/backend/myenv/nlp_processing.py', inputData]);

    let responseData = '';

    pythonProcess.stdout.on('data', (data) => {
        responseData += data.toString(); 
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        responseData += data.toString(); 
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        res.send(responseData);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});