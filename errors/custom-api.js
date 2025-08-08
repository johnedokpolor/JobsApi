class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400; // Default status code
  }
}

module.exports = CustomAPIError;
