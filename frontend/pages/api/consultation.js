export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, datetime, domain, subdomain, message } = req.body || {};
  const errors = {};

  if (!name || !name.trim()) errors.name = 'Name is required';
  if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) errors.email = 'Valid email is required';
  if (!datetime) errors.datetime = 'Preferred slot is required';
  if (!domain) errors.domain = 'Domain is required';
  if (!subdomain) errors.subdomain = 'Subdomain is required';
  if (!message || message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters';
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  const payload = {
    id: `CONS-${Date.now()}`,
    name: name.trim(),
    email,
    datetime,
    domain,
    subdomain,
    message: message.trim(),
  };

  console.log('Consultation request received:', payload);

  return res.status(200).json({
    message: 'Consultation request received',
    requestId: payload.id,
  });
}
