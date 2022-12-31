const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = 8000;
const cors = require("cors");
const db = require("./config/mongoose");
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
app.use(
  cors({
    origin: "*"
  })
);

// let arr = [];
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/user', userRoutes)
app.use('/category', categoryRoutes)

app.get("/", (req, res) => {
  res.send("<h1>Hey from Nodejs server</h1>");
});

//app."Method"("/route", func/controller)
// app.post("/create", (req, res) => {
//   arr.push({ ...req.body, id: Math.floor(Math.random() * 1000) });
//   res.json({ message: "Object added successfully" });
// });

// app.get("/getData/:name", (req, res) => {
//   // console.log(req.query);
//   // console.log(req.params);
//   console.log('first');
//   res.json(arr);
// });

// app.get("/getData/:admin", (req, res)=> {
//   console.log('second')
// })

// app.delete("/deleteData", (req, res) => {
//   // Try splice on your own
//   const id = req.body.id;
//   const updatedArr = arr.filter((elem) => elem.id !== id);
//   arr = [...updatedArr];
//   res.json({ message: "Object deleted successfully" });
// });

// app.put("/updateData", (req, res) => {
//   const { id, name, age } = req.body;
//   const index = arr.findIndex((elem) => elem.id === id);
//   arr[index] = {
//     id: id,
//     name: name,
//     age: age
//   };
//   res.json({ message: "Object updated successfully" });
// });

app.listen(port, () => {
  console.log("Server Running on 8000");
});
