const Users = require('../models/Users.js');

const signup = async (req, res) => {
    const { mobile, email, password } = req.body;

    try {
        const userExist = await Users.findOne({ email });

        if (userExist) {
            return res.status(403).json({ msg: 'Email already in use' }); // Return added
        }

        let userCreated = await Users.create({ mobile, email, password });

        const token = await userCreated.generateToken();

        return res.status(200).json({
            msg: 'Account created successfully :)',
            token
        });

    } catch (error) {
        console.error('Error in signup:', error);
        return res.status(500).json({ msg: 'Internal Server Error' }); // Return added
    }
}

module.exports = signup;
