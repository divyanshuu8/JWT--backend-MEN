const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; // Replace with your own secret key

const login = (req, res) => {
  const { username, password } = req.body;

  // You can implement your own user authentication logic here
  if (username === 'admin' && password === 'admin123') {
    // User is authenticated
    const token = jwt.sign({ username }, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

module.exports = {
  login,
};
