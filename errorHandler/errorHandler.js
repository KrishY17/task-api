module.exports = (err, req, res, next) => {
    console.error(err.stack);

    // Use the error's statusCode if defined, otherwise default to 500
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        data: null,
        message: err.message || "Internal Server Error",
    });
};
