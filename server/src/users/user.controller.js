const User = require("./user.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await User.findOne({ username });
        if (!admin) {
            return res.status(404).send({ message: "Admin not found" });
        }
        if (admin.password !== password) {
            return res.status(401).send({ message: "Invalid password" });
        }

        // sending pwd in payload is bad practice. even it hashed, bcz payload is encoded not encrypted
        // { id: admin._id, password: admin.password, role: admin.role },

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role,
            },
        });
    } catch (error) {
        console.error("Failed to login as admin", error);
        res.status(500).json({ message: "Failed to login as admin" });
    }
};

module.exports = { adminLogin };
