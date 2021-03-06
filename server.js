const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/weatherAppFixDB", { useUnifiedTopology: true });
const api = require("./server/routers/api");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

app.use("/", api);

const port =  4000;
app.listen(process.env.PORT || port, () => console.log("server is up and runing"));
	