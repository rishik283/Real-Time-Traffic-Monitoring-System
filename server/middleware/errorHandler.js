const errorHandler = (error, _req, res, _next) => {
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((value) => value.message);
    return res.status(400).json({ success: false, message: messages.join(", ") });
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};

module.exports = errorHandler;
