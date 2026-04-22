export default async function handler(req, res) {
  const { stopId, stopNr, line } = req.query;

  const url = `https://api.um.warszawa.pl/api/action/dbtimetable_get/?id=e923fa0e-d96c-43f9-ae6e-60518c9f3238&busstopId=${stopId}&busstopNr=${stopNr}&line=${line}&apikey=${process.env.API_KEY}`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "proxy error" });
  }
}

export default async function handler(req, res) {
  res.json({
    hasKey: !!process.env.API_KEY,
    keyPreview: process.env.API_KEY?.slice(0, 5)
  });
}
