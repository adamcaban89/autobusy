export default async function handler(req, res) {
  try {
    const { stopId, stopNr, line } = req.query;

    if (!stopId || !stopNr || !line) {
      return res.status(400).json({ error: "missing params" });
    }

    if (!process.env.API_KEY) {
      return res.status(500).json({ error: "missing API_KEY env" });
    }

    const url = `https://api.um.warszawa.pl/api/action/dbtimetable_get/?id=e923fa0e-d96c-43f9-ae6e-60518c9f3238&busstopId=${stopId}&busstopNr=${stopNr}&line=${line}&apikey=${process.env.API_KEY}`;

    const r = await fetch(url);

    const text = await r.text(); // ważne: NIE zakładamy JSON od razu

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        error: "invalid JSON from API",
        raw: text.slice(0, 200)
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      error: "server crashed",
      message: err.message
    });
  }
}
