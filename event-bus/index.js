const express = require("express")
const axios = require("axios")
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/events",(req,res)=>{

    const event = req.body;

    console.log("Event posted: " + event.type);

    axios.post("htpp://localhost:4000/events",event).catch((error) =>{
        console.log("Error  in posting event in post service" + error)
    });

    axios.post("htpp://localhost:4001/events",event).catch((error) =>{
        console.log("Error  in posting comment in post service" + error)
    });
    
    axios.post("htpp://localhost:4003/events",event).catch((error) =>{
        console.log("Error  in posting comment in post service" + error)
    });

});

app.listen(4005,() =>{
    console.log("Listning at 4005");
})