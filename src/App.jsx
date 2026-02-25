import WeatherByDate from "./components/WeatherByDate";
import WeatherByMonth from "./components/WeatherByMonth";
import WeatherStats from "./components/WeatherStats";


function App() {
  return (
    <div className="container">
      <h1>Delhi Weather Dashboard</h1>
      
      <div className="box">
        <WeatherByDate />
      </div>

      <div className="box">
        <WeatherByMonth />
      </div>

      <div className="box">
        <WeatherStats />
      </div>
      
    </div>
  );
}

export default App;