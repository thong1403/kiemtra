const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//ex2

app.get("/api/v1/todos", (req, res) => {
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    if (err) {
      throw err;
    } else {
      let users = JSON.parse(data);
      console.log(users);
      res.status(200).json(users);
    }
  });
});
app.get("/api/v1/todos/:id", (req, res) => {
  console.log(req.params.id);
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    if (err) {
      throw err;
    } else {
      let quesTions = req.params.id;
      let users = JSON.parse(data);
      let IdData = users.find((e) => e.id == quesTions);
      if (quesTions) {
        res.status(200).json(IdData);
      } else {
        res.status(200).json({ message: "không có" });
      }

      console.log(users);
    }
  });
});
app.post("/api/v1/todos", (req, res) => {
   
  fs.readFile("./dev-data/todos.json", (err, data) => {
    let users = JSON.parse(data);
    let titles = users.find((e) => e.title == req.body.title);
    if (titles) {
      res.status(200).json({ message: "Todo already exists" });
    } else {
     
      users.push(req.body)
      fs.writeFile(
        `${__dirname}/dev-data/todos.json`,
        JSON.stringify(users),
        (err, data) => {
          if (err) {
            throw err;
          } else {
            res.status(200).json({ message: "Create successfully" });
          }
        })
     }
     });
});
app.put("/api/v1/todos/:id", (req, res) => {
    let id = Number(req.params.id);
    fs.readFile("./dev-data/todos.json", (err, data) => {
      if (err) {
        throw err;
      }
      let users = JSON.parse(data);
      let findIndex = users.findIndex((e) => {
        return e.id === id;
      });
      console.log(findIndex);
      if (findIndex == "-1") {
        res.status(200).json({ message: "Question not found" });
      } else if (findIndex >= 0) {
        let updateQuestion = {
          id: id,
          ...req.body,
        };
        users.splice(findIndex, 1, updateQuestion);
        fs.writeFile(
          "./dev-data/todos.json",
          JSON.stringify(users),
          (err) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json({ message: "Updated Successfully" });
            }
          }
        );
      }
    });
  });

  app.delete("/api/v1/todos/:id", (req, res) => {
  fs.readFile("./dev-data/todos.json", (err, data) => {
    if (err) {
      console.log(err);
    }
    let users = JSON.parse(data);
    let idData = Number(req.params.id);
    console.log(idData);
    let findIndex = users.findIndex((e) => {
      return e.id == idData;
    });
    console.log(findIndex);
    if (findIndex == "-1") {
      res.status(200).json("Question not found");
    } else if (findIndex >= 0) {
      users.splice(findIndex, 1);
      fs.writeFile(
        "./dev-data/questions.json",
        JSON.stringify(users),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json("Delete successfully");
          }
        }
      );
    }
  });
});

 //ex 4

 



app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});
