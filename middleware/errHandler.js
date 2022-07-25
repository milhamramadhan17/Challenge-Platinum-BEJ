function errorHandler (err, req, res, next) {
    console.log (err)
    let message = 'Internal server error';
    let status = 500;

    if (err.name === 'ValidationError') {
        message = err.message;
        status = 400;
    }

    else if (err.error === "Email is already exist") {
        status = 400;
        message = "Email is already exist";
    }

    else if (err.error === "password is incorrect") {
        status = 401;
        message = "password is incorrect, please try again";
    }

    else if (err.error === "Email is incorrect") {
        status = 401;
        message = "Email is incorrect, please try again";
    }

    else if (err.error === "Cannot find Order with id") {
        status = 404;
        message = "Cannot find Order with id ";
    }

    else if (err.error === "Quantity is number only") {
        status = 400;
        message = "qty is not a number";
    }

    else if (err.error === "Unauthorized") {
        status = 401;
        if (err.authType === "admin") message= "Unauthorized. Only customer can access this endpoint.";
        else if (err.authType === "seller") message= "Unauthorized. Only seller can access this endpoint.";
        else if (err.authType === "customer") message= "Unauthorized. Only customer can access this endpoint.";
    }

    else if (err.error === 'column "photo" of relation "Items" does not exist') {
        status = 400;
        message = 'There is no column "photo" in table "Items"';
    }

    else if (err.error === "Email already exists") {
        status = 400;
        message = "Email already exists";
    }

    else if (err.error === "Bad Request") {
        status = 400;
        message = "Bad request 400 - Invalid request body";
    }

    else if (err.error === "Name cannot be empty") {
        status = 400;
        message = "Name cannot be empty";
    }

    else if (err.error === "request entity too large") {
        status = 413;
        message = "File is too large";
    }


    return res.status(status).json({
        status: status,
        error: {
            message
        }
    });
}

module.exports = errorHandler;