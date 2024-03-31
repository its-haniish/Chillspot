const sendEmailFn = require('../functions/sendEmailFn.js');

const sendEmail = async (req, res) => {
    const { email, subject, msg } = req.body;

    try {
        await sendEmailFn({ email, subject, msg })
            .then(() => {
                res.status(200).json({
                    msg: "Message sent successfully",
                })
            })
            .catch(() => {
                res.status(500).json({
                    msg: "Failed to send message"
                })
            })
    } catch (error) {
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }

}

module.exports = sendEmail;