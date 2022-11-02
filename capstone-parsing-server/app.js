const express = require("express");
const app = express();

const indexRouter = require("./routes");
const portableRouter = require("./routes/portable");

app.set("port", process.env.PORT || 8080);

app.use("/", indexRouter);
app.use("/portable", portableRouter);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port start");
});
