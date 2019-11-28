const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Bodyparser Middleware
app.use(express.json());

// Spotify html page
app
  .use("/", express.static("public"))
  .use(cors())
  .use(cookieParser());

// DB Config
const db = config.get("mongoURI");

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected...!"))
  .catch(err => console.log(err));

// Use routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/lyrics", require("./routes/api/lyrics"));
app.use("/api/spotify", require("./routes/api/spotify"));
// app.use('/api/sample', sample);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
