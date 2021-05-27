const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (request, response) => {
  console.log("GET");
  response.json(messages);
});

app.post("/messages", (request, response) => {
  const message = request.body;
  message.id = messages.length;
  messages.push(message);
  response.send(messages);
});

app.get("/messages/:id", (request, response) => {
  const id = Number(request.params.id);
  const foundMessage = messages.find((message) => {
    return message.id === id;
  });
  response.json(foundMessage);
});

app.delete("/messages/:id", (request, response) => {
  const id = Number(request.params.id);
  messages.map((message) => {
    message.id === id ? messages.splice(id, 1) : null;
  });
  response.send(`You have deleted a message with id ${id}`);
});

app.listen(port);
