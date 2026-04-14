const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
  }),
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ success: true, message: "Portfolio API running" });
});

app.use("/api/contact", contactRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
