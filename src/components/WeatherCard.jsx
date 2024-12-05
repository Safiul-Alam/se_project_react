import "../blocks/WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../utils/constants";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  //   const filteredOptions = weatherOptions.filter((option) => {
  //     return (
  //       option.day === weatherData.isDay &&
  //       option.condition === weatherData.condition
  //     );
  //   });

  //   let weatherOption;
  //   if (filteredOptions.lenght === 0) {
  //     weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  //   } else {
  //     weatherOption = filteredOptions[0];
  //   }

  const foundOption = weatherOptions.find((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption = foundOption
    ? foundOption
    : defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData?.temp?.[currentTemperatureUnit];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp}&deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={weatherOption?.condition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
