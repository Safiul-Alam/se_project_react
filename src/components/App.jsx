import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import DeleteModal from "./DeleteModal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal.jsx";
import {
  signUp,
  getUserProfile,
  handleEditProfile,
  addCardLike,
  removeCardLike,
} from "../utils/auth";
import * as auth from "../utils/auth.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (cardData) => {
    setActiveModal("preview");
    setSelectedCard(cardData);
  };

  const handleDeleteCardClick = () => {
    setActiveModal("delete-confirmation");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegisterModal = () => {
    setActiveModal("signUp");
  };
  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleToggleSwitchChange = () => {
    // if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    // if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  // console.log(currentTemperatureUnit);

  const handleAddItem = (item) => {
    return postItems(item)
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCard = (card) => {
    const token = localStorage.getItem('jwt'); // or wherever you store the token
  
    deleteItems(card._id, token)
      .then(() => {
        setClothingItems((cards) => 
          cards.filter((selectedCard) => selectedCard._id !== card._id));
        setSelectedCard({});
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    const userProfile = { email, password, name, avatar };
    signUp(userProfile)
      .then((res) => {
        onLogIn({ email, password });
      })
      .catch((error) => {
        console.error("error at signing up", error);
      });
  };

  const handleLogIn = ({ email, password }) => {
    console.log("login");
    auth
      .logIn({ email, password })
      .then((data) => {
        console.log("data", data);

        localStorage.setItem("jwt", data.token);
        getUserProfile(data.token).then((res) => {
          console.log(res);
          setCurrentUser(res);
          setIsLoggedIn(true);
          navigate("/profile");
        });
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogOutClick = () => {
    try {
      localStorage.removeItem("jwt");
      Promise.resolve()
        .then(() => {
          setIsLoggedIn(false);
          closeActiveModal();
        })
        .catch((error) => {
          console.error("Error during logout:", error);
        });
    } catch (error) {
      console.error("Unexpected error during logout:", error);
    }
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
        // console.log(items)
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // watch activeModal here

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserProfile(token)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              clothingItems={clothingItems}
              isLoggedIn={isLoggedIn}
              handleRegisterModal={handleRegisterModal}
              handleLoginModal={handleLoginModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    isLoggedIn={isLoggedIn}
                    handleLogOutClick={handleLogOutClick}
                  />
                }
              ></Route>
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
            handleDeleteClick={handleDeleteCardClick}
          />

          <DeleteModal
            item={selectedCard}
            isOpened={activeModal === "delete-confirmation"}
            onClose={closeActiveModal}
            handleDeleteItem={handleDeleteCard}
            selectedCard={selectedCard}
            handleCloseClick={closeActiveModal}
          />
        </CurrentTemperatureUnitContext.Provider>

        <RegisterModal
          isOpen={activeModal === "signUp"}
          closeActiveModal={closeActiveModal}
          onRegister={handleRegister}
          openLoginModal={handleLoginModal}
        />

        <LoginModal
          isOpen={activeModal === "login"}
          closeActiveModal={closeActiveModal}
          onLogin={handleLogIn}
          openRegisterModal={handleRegisterModal}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
