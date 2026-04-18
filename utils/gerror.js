const gerror = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const status = err.status || "error";
    res.status(statusCode).json({
        status,
        message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null,
        error: process.env.NODE_ENV === "development" ? err : null
    })
}

export default gerror;