const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const storyRoutes = require("./routes/story");
const { verifyToken } = require("./utils/token");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = "mongodb://127.0.0.1:27017/veebo";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection is successful");
});

app.use("/uploads", express.static("uploads"));
app.use("/user", userRoutes);
app.use("/story", storyRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Veebo!" });
});
app.get("/admin", verifyToken, (req, res) => {
    if (!req.user || !req.user.admin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    res.json({ message: "Welcome to Admin!" });
  });
  

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
