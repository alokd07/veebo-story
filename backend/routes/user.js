const router = require("express").Router();
const User = require("../modal/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken, verifyToken } = require("../utils/token");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).json({ error: "User already exists" });
    }

    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.json({ message: "Saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/all", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    const filteredUsers = users.map((user) => {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };
    });
    res.json(filteredUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
