async function errorHandler(error, req, res, next) {
    switch (error.name) {
        case "SequelizeUniqueConstraintError" :
            res.status(400).json({message: "Username or e-mail has already been taken"})
            break
        case "SequelizeValidationError" :
            res.status(400).json({message: error.errors.map(el => el.message)})
            break
        case "Data not found" :
            res.status(404).json({message: "Data has not found"})
            break
        default:
            res.status(500).json({message: "Internal server error"})
            break
    }
}

module.exports = errorHandler