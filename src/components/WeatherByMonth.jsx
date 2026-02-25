import { useState } from "react";

function WeatherByMonth() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [results, setResults] = useState([]);

  const fetchWeather = async () => {
    try {
      if (!month || !year) {
        alert("Enter month and year");
        return;
      }

      const DELHI = { lat: 28.6139, lon: 77.2090 };

      const mm = String(month).padStart(2, "0");

      // Get correct last day of month (handles leap years)
      const lastDay = new Date(year, month, 0).getDate();

      const start = `${year}-${mm}-01`;
      const end = `${year}-${mm}-${String(lastDay).padStart(2, "0")}`;

      const url =
        `https://archive-api.open-meteo.com/v1/archive` +
        `?latitude=${DELHI.lat}&longitude=${DELHI.lon}` +
        `&start_date=${start}&end_date=${end}` +
        `&daily=temperature_2m_mean,relative_humidity_2m_mean,pressure_msl_mean` +
        `&timezone=Asia%2FKolkata`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();

      if (!data.daily || !data.daily.time?.length) {
        throw new Error("No data available");
      }

      const d = data.daily;

      const rows = d.time.map((t, i) => ({
        date: t,
        temperature: d.temperature_2m_mean?.[i],
        humidity: d.relative_humidity_2m_mean?.[i],
        pressure: d.pressure_msl_mean?.[i],
      }));

      setResults(rows);

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Search Weather by Month</h2>

      <input
        type="number"
        placeholder="Enter month (1-12)"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter year (e.g. 2022)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <button onClick={fetchWeather}>Search</button>

      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Temp</th>
              <th>Humidity</th>
              <th>Pressure</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.temperature}</td>
                <td>{item.humidity}</td>
                <td>{item.pressure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WeatherByMonth;