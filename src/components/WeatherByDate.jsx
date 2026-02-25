import { useState } from "react";

function WeatherByDate() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState(null);

  const fetchWeather = async () => {
  try {
    if (!date) {
      alert("Please select a date");
      return;
    }

    const DELHI = { lat: 28.6139, lon: 77.2090 };

    const url =
      `https://archive-api.open-meteo.com/v1/archive` +
      `?latitude=${DELHI.lat}&longitude=${DELHI.lon}` +
      `&start_date=${date}&end_date=${date}` +
      `&hourly=temperature_2m,relative_humidity_2m,pressure_msl` +
      `&timezone=Asia%2FKolkata`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();

    if (!data.hourly) {
      throw new Error("No data available");
    }

    const h = data.hourly;

    setResult({
      condition: "Normal",
      temperature: h.temperature_2m?.[0],
      humidity: h.relative_humidity_2m?.[0],
      pressure: h.pressure_msl?.[0],
    });

  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div>
      <h2>Search Weather by Date</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={fetchWeather}>Search</button>

      {result && (
        <div className="result">
          <p>Condition: {result.condition}</p>
          <p>Temperature: {result.temperature} °C</p>
          <p>Humidity: {result.humidity} %</p>
          <p>Pressure: {result.pressure} hPa</p>
        </div>
      )}
    </div>
  );
}

export default WeatherByDate;