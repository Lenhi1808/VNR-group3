export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const UPSTREAM = process.env.UPSTREAM_API;
  if (!UPSTREAM) return res.status(500).json({error:'Missing UPSTREAM_API env var'});
  try {
    const r = await fetch(UPSTREAM, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(req.body || {}),
    });
    const text = await r.text();
    res.status(r.status).send(text);
  } catch (e) {
    console.error(e);
    res.status(502).json({error:'Bad gateway to upstream'});
  }
}
