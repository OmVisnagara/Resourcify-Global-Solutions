export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { name, email, country, phone, company, service, message } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    // If a Google Apps Script URL is configured, forward the data
    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (appsScriptUrl) {
      const response = await fetch(appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, country, phone, company, service, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to forward to Apps Script');
      }
    }

    // Log submission (visible in Vercel function logs, NOT in browser)
    console.log('Contact form submission:', {
      name,
      email,
      country,
      phone,
      company,
      service,
      message,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({ success: true, message: 'Form submitted successfully.' });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
