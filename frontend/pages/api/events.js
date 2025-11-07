import events from '../../data/events.json';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  return res.status(200).json({
    message: 'Events fetched successfully',
    events,
  });
}
