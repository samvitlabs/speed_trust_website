export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body || {};
  const errors = {};

  if (!name || !name.trim()) errors.name = 'Name is required';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Valid email is required';
  if (!message || message.trim().length < 5) {
    errors.message = 'Message should be at least 5 characters';
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  const payload = {
    id: `CONTACT-${Date.now()}`,
    name: name.trim(),
    email,
    message: message.trim(),
  };

  console.log('Contact submission:', payload);

  return res.status(200).json({
    message: 'Contact request received',
    requestId: payload.id,
  });
}
