import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import { APIkey, coordinates } from "../utils/constants";
import Footer from "./Footer";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "./AddItemModal";
import Profile from "./Profile";
import { getItems, postItems, deleteItems } from "../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (cardData) => {
    setActiveModal("preview");
    setSelectedCard(cardData);
  };

  const handleToggleSwitchChange = () => {
    // if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    // if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  // console.log(currentTemperatureUnit);


  // function createItem(item){
  //   return fetch(...)
  // }

  const handleModalClose = () => {
    setActiveModal("");
  };

  const handleAddItem = (item) => {
    return postItems(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleModalClose();
      })
      .catch((err) => console.log(err));
  };



  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        // console.log(data);
        const filteredData = filterWeatherData(data);
        // console.log(filteredData);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []); // [] empty array makes it run one time only


  useEffect(() => {
    getItems()
    .then((items) => {
      console.log(items)
      setClothingItems(items)
    })
    .catch(console.error)
  }, []); 


  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} clothingItems={clothingItems}/>
          <Routes>
            <Route path="/" element={<Main weatherData={weatherData} 
              onCardClick={handleCardClick} clothingItems={clothingItems}/>}></Route>
            <Route path="/profile" 
             element={<Profile onCardClick={handleCardClick} clothingItems={clothingItems} />}></Route>
          </Routes>
          <Footer />
        </div>


        <AddItemModal
          onCloseModal={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItem}
        />

        <ItemModal
          activeModal={activeModal}
          cardData={selectedCard}
          onClose={closeActiveModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
