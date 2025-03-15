const router = require("express").Router();
const Story = require("../modal/storySchema");
const { verifyToken } = require("../utils/token");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post(
  "/create",
  verifyToken,
  upload.single("thumbnail"),
  async (req, res) => {
    const { title, body, genre } = req.body;

    if (!title || !body || !genre) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Thumbnail is required" });
    }

    const story = new Story({
      title,
      body,
      genre,
      thumbnail: req.file.path,
    });

    try {
      await story.save();
      res.status(201).json({ message: "Story saved successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put("/update/:id", verifyToken, async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  try {
    await Story.findByIdAndUpdate(req.params.id, { title, body });
    res.status(200).json({ message: "Story updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Story deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/all", async (req, res) => {
  const { category } = req.query;
  try {
    if (category === "all") {
      const stories = await Story.find();
      res.json(stories);
    } else {
      const stories = await Story.find({ genre: category });
      res.json(stories);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
