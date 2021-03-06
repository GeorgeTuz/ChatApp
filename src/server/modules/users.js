const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const UserSchema = new Schema(
    {
        id: String,
        name: String,
        avatar: String
    }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
