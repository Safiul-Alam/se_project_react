import { React, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
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
import EditProfileModal from "./EditProfileModal.jsx";
import {
  signUp,
  getUserProfile,
  handleEditProfile,
  addCardLike,
  removeCardLike,
} from "../utils/auth";
import * as auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute";

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

  const [isLoading, setIsLoading] = useState(false);

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

  const handleEditProfileClick = () => {
    setActiveModal("edit");
  };

  const handleToggleSwitchChange = () => {
    // if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    // if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  // console.log(currentTemperatureUnit);

  const handleAddItem = (item, resetInputs) => {
    setIsLoading(true);
    return postItems(item)
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
        closeActiveModal();
        resetInputs();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteCard = (card) => {
    const token = localStorage.getItem("jwt"); // or wherever you store the token

    deleteItems(card._id, token)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((selectedCard) => selectedCard._id !== card._id)
        );
        setSelectedCard({});
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    const userProfile = { email, password, name, avatar };
    return signUp(userProfile)
      .then(() => {
        handleLogIn({ email, password });
      })
      .catch((error) => {
        console.error("error at signing up", error);
      });
  };

  const handleLogIn = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const data = await auth.logIn({ email, password });
      localStorage.setItem("jwt", data.token);

      const res = await getUserProfile(data.token);
      setCurrentUser(res);
      setIsLoggedIn(true);
      navigate("/profile");
      closeActiveModal();
    }
    catch (error) {
      console.error('Login failed:', error);
      console.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };


  const handleLogOutClick = () => {
    setIsLoading(true);
    try {
      localStorage.removeItem("jwt");
      Promise.resolve()
        .then(() => {
          setIsLoggedIn(false);
          closeActiveModal();
        })
        .catch((error) => {
          console.error("Error during logout:", error);
        }).finally(() => {
          setIsLoading(false);
        })
    }
    catch (error) {
      console.error("Unexpected error during logout:", error)
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const onEditProfileSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    handleEditProfile({ name, avatar }, token)
      .then((res) => {
        setCurrentUser({ ...currentUser, ...res });
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleCardLike = (id, isLiked) => {
    console.log(id);
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
          console.log("Item liked", updatedCard);
        })
        .catch((err) => console.log(err));
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch(console.error);
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
                    // onToggleLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                    handleCardLike={handleCardLike}
                    handleAddClick={handleAddClick}
                  />
                }
              ></Route>
              
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      isLoggedIn={isLoggedIn}
                      handleLogOutClick={handleLogOutClick}
                      handleEditProfileClick={handleEditProfileClick}
                      // onToggleLike={handleCardLike}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            onCloseModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItem}
            isLoading={isLoading}
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
          handleLoginClick={handleLoginModal}
        />

        <LoginModal
          isOpen={activeModal === "login"}
          closeActiveModal={closeActiveModal}
          onLogin={handleLogIn}
          handleSignUpClick={handleRegisterModal}
          isLoading={isLoading}
        />

        <EditProfileModal
          isOpen={activeModal === "edit"}
          closeActiveModal={closeActiveModal}
          onEditProfileSubmit={onEditProfileSubmit}
          isLoading={isLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
