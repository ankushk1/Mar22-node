const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/mar22DB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
})

db.once("open", () => {
  console.log('Successfully connected to DB')
})