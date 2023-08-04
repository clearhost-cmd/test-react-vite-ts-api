/**
 * Error handling middleware for Express applications.
 * @param {Error} err - The error object or Error instance.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
   // Log the error stack to the console for debugging purposes
   console.error(err.stack);

   // Respond with a 500 Internal Server Error and a JSON error message
   res.status(500).json({ error: 'Something went wrong!' });
};

module.exports = { errorHandler };
