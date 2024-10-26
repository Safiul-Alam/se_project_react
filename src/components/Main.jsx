import WeatherCard from "./WeatherCard";
import '../blocks/Main.css';
import ItemCard from "./ItemCard";
import { defaultClothingItems } from "../utilts/constants";


function Main({ weatherData, handleCardClick }) {
    return (
        <main>
            <WeatherCard />
            <section className="cards">
                <p className="cards__text">
                    Today is 75 &deg; F / You may want to wear:
                </p>
                 <ul className="cards__list">
                    {defaultClothingItems
                    // .filter((item) => {
                    //     // console.log(item);
                    //     return item.weather === weatherData.type;
                    // })
                    .map((item) => {
                        return <ItemCard key={item._id} item={item} onCardClick={handleCardClick}/>
                    })}
                 </ul>
            </section>
        </main>
    );
}

export default Main;