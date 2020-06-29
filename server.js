const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

client.on('connect', () => {
    client.publish('garage/connected', "Node Server Connected");
    client.subscribe("mani19/data");
})


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use(express.static(path.join(__dirname, "public")))

app.post("/api/turn", (req, res, next) => {
    const on = req.body.on;
    client.publish("mani19/motor", on.toString());
    console.log(req.body)
});
let response;

client.on("message",(topic,data)=>{
    if (topic=="mani19/data"){
        console.log("data",data.toString());
        if (response){
            response.json(data.toString());
        }

    }
})

app.get("/api/refresh", (req, res, next) => {
    // client.subscribe("mani19/data",(data)=>{
    //     console.log("data",data.toString());
    //
    // })
    response=res;
    client.publish("mani19/refresh","refresh");
    console.log("Refresh Route");

});


app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
})

app.listen(process.env.PORT || 3000);


