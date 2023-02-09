const mongoose = require("mongoose");

exports.validateId = id => {
    return mongoose.Types.ObjectId.isValid(id);
};