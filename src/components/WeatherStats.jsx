import { useState } from "react";

function WeatherStats() {
  const [year, setYear] = useState("");
  const [results, setResults] = useState([]);

  const fetchStats = async () => {
  try {
    if (!year) {
      alert("Enter a year");
      return;
    }

    const DELHI = { lat: 28.6139, lon: 77.2090 };

    const start = `${year}-01-01`;
    const end = `${year}-12-31`;

    const url =
      `https://archive-api.open-meteo.com/v1/archive` +
      `?latitude=${DELHI.lat}&longitude=${DELHI.lon}` +
      `&start_date=${start}&end_date=${end}` +
      `&daily=temperature_2m_mean` +
      `&timezone=Asia%2FKolkata`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch stats");

    const data = await response.json();

    if (!data.daily) {
      throw new Error("No data available");
    }

    const d = data.daily;

    const monthMap = {};

    d.time.forEach((t, i) => {
      const m = t.slice(5, 7);
      const temp = d.temperature_2m_mean?.[i];
      if (!monthMap[m]) monthMap[m] = [];
      monthMap[m].push(temp);
    });

    const rows = [];

    for (let i = 1; i <= 12; i++) {
      const mm = String(i).padStart(2, "0");
      const temps = monthMap[mm] || [];

      if (!temps.length) {
        rows.push({ month: mm, min: "N/A", median: "N/A", max: "N/A" });
      } else {
        const sorted = temps.sort((a, b) => a - b);
        rows.push({
          month: mm,
          min: sorted[0],
          median: sorted[Math.floor(sorted.length / 2)],
          max: sorted[sorted.length - 1],
        });
      }
    }

    setResults(rows);

  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div>
      <h2>Temperature Stats by Year</h2>

      <input
        type="number"
        placeholder="Enter year (e.g. 2015)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <button onClick={fetchStats}>Get Stats</button>

      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Min</th>
              <th>Median</th>
              <th>Max</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={index}>
                <td>{item.month}</td>
                <td>{item.min}</td>
                <td>{item.median}</td>
                <td>{item.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WeatherStats;