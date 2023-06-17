const jwt = require('jsonwebtoken');
require('dotenv').config()

const authenticateUser = (req, res) => {
    const { username, password } = req.body;

    // Mock authentication logic
    const mockCredentials = [
        { username: 'teacher1', password: 'teacher123', role: 'teacher' },
        { username: 'student', password: 'student123', role: 'student' }
    ];

    const user = mockCredentials.find(
        (cred) => cred.username === username && cred.password === password
    );

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Authentication successful, generate a token
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ username, role: user.role }, secretKey, {
        expiresIn: '1h'
    });

    res.json({ token });
};

module.exports = {
    authenticateUser
};
