const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const contact = await Contact.create({ name, email, message });
    res.status(201).json({
      success: true,
      message: "Message submitted successfully",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
