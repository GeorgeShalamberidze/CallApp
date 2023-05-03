const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const port = process.env.PORT || 3001;
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/data", (req, res) => {
  fs.readFile("data.json", (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    res.send(JSON.parse(data));
  });
});

app.get("/api/data/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("data.json", (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    const item = jsonData.find((item) => item.id === parseInt(id));
    if (!item) {
      res.status(404).send("Item not found");
    } else {
      res.send(item);
    }
  });
});

app.post("/api/data", express.json(), (req, res) => {
  const newItem = req.body;
  console.log(newItem);
  fs.readFile("data.json", (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    jsonData.push(newItem);
    fs.writeFile("data.json", JSON.stringify(jsonData), (err) => {
      if (err) throw err;
      res.send(newItem);
    });
  });
});

app.put("/api/data/:id", express.json(), (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  fs.readFile("data.json", (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    const idx = jsonData.findIndex((item) => item.id === parseInt(id));

    if (idx === -1) res.status(404).send("Invalid item. Not Found !");
    else {
      jsonData[idx] = updatedData;
      fs.writeFile("data.json", JSON.stringify(jsonData), (err) => {
        if (err) throw err;
        res.send(updatedData);
      });
    }
  });
});

app.delete("/api/data/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile("data.json", (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    const index = jsonData.findIndex((item) => item.id === parseInt(id));
    if (index === -1) res.status(404).send("Item not found");
    else {
      jsonData.splice(index, 1);
      fs.writeFile("data.json", JSON.stringify(jsonData), (err) => {
        if (err) throw err;
        res.send("Item deleted");
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
