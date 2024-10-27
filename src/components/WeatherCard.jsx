import sunny from '../images/sunny.png'
import '../blocks/WeatherCard.css'
import { weatherOptions } from '../utilts/constants';

function WeatherCard({weatherData}) {

    const filteredOptions = weatherOptions.filter((option) => {
        return (
          option.day === weatherData.isDay &&
          option.condation === weatherData.condation
        );
      });

      let weatherOption;
      if (filteredOptions.lenght === 0) {
        weatherOptions = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
      } else {
        weatherOption = filteredOptions[0];
    
      }


    return (
        <section className="weather-card">
        <p className="weather-card__temp">{weatherData.temp.F} &deg;</p>
        <img src={weatherOptions?.url} 
            alt={`Card showing ${weatherOption?.day ? "day" : "night"} time ${weatherOption?.Condition 
            } weather`} 
            className="weather-card__image" />
        </section>
        
    );
}

export default WeatherCard;