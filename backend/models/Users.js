const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    orders: {
        type: Array,
        default: []
    }
});

userSchema.pre("save", async function (next) {
    try {
        const saltRound = await bcrypt.genSalt();
        const hash_password = await bcrypt.hash(this.password, saltRound);
        this.password = hash_password;
        return next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
    } catch (error) {
        // Handle error appropriately
        console.error('Error generating token:', error);
        return null; // Or throw error as per your requirement
    }
};

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}


const Users = new mongoose.model('User', userSchema);

module.exports = Users;