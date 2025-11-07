import users from '../../data/users.json';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = users.find(
    (record) =>
      record.email.toLowerCase() === String(email).toLowerCase() && record.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.status(200).json({
    message: 'Login successful',
    user: {
      email: user.email,
      name: user.name,
    },
  });
}
