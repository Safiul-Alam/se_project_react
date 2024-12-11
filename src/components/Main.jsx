import { useContext } from "react";

import WeatherCard from "./WeatherCard";
import "../blocks/Main.css";
import ItemCard from "./ItemCard";
// import { defaultClothingItems } from "../utils/constants";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, onCardClick, clothingItems, isLoggedIn, handleCardLike, onToggleLike  }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  // const temp = weatherData?.temp?.[currentTemperatureUnit] || 999;
  // console.log('This is a prop from our Parent App.jsx =>', clothingItems)
  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>

        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard key={item._id} item={item} 
              onCardClick={onCardClick} 
              isLoggedIn={isLoggedIn}
              handleCardLike={handleCardLike}
              onToggleLike={onToggleLike}
              />
            ))}
        </ul>
      </section>

    </main>
  );
}

export default Main;
