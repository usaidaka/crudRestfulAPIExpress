const express = require("express");
const app = express();
const port = 8080;
const User = require("./server/api/product");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.use("/api", User);

app.use("*", function (req, res) {
  res.json("Are you missing route?", 404);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
