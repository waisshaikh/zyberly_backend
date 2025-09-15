import jwt from 'jsonwebtoken';

// Hardcoded admin users
const admins = [
  { email: 'wais@zyberly.in', password: 'Shaikhawais@231' },
  { email: 'mojammil@zyberly.in', password: 'Mojammilkhan@231' },
  { email: 'aliya@zyberly.in', password: 'Aliyakhan@231' },
  { email: 'dilshad@zyberly.in', password: 'DilshadShaikh@231' }
];

export const login = (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Find matching admin
  const admin = admins.find(u => u.email === email && u.password === password);

  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create JWT token
  const token = jwt.sign(
    { email: admin.email },
    process.env.JWT_SECRET || 'defaultSecret',
    { expiresIn: '1h' }
  );

  // Respond with token & greet message
  return res.json({
    token,
    email: admin.email,
    message: `🎉 Welcome, ${admin.email.split('@')[0]}! Login successful.`
  });
};
