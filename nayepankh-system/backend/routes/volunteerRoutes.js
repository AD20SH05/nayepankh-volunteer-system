const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Volunteer = require("../models/Volunteer");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new Volunteer({ ...req.body, password: hashedPassword });
    await user.save();
    res.send("Registered Successfully");
  } catch {
    res.status(400).send("Error");
  }
});

router.post("/login", async (req, res) => {
  const user = await Volunteer.findOne({ email: req.body.email });
  if (!user) return res.send("User not found");
  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.send("Invalid credentials");
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

router.get("/", async (req, res) => {
  const data = await Volunteer.find();
  res.json(data);
});

module.exports = router;