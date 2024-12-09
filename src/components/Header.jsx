import { Link } from "react-router-dom";
import { useContext } from "react";
import "../blocks/Header.css";
import logo from "../images/logo.svg";
import avatar from "../images/avatar.svg";
import ToggleSwitch from "./ToggleSwitch";
import CurrentUserContext from '../contexts/CurrentUserContext'

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLoginModal,
  handleRegisterModal,
}) {

  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  if (isLoggedIn) {
    return (
      <header className="header">
        <div className="header__group ">
          <Link to="/" className="header__link">
            <img className="header__logo" src={logo} alt="header logo" />
          </Link>


          <p className="header__date-and-location">
            {currentDate}, {weatherData.city}
          </p>
        </div>

        <div className="header__group ">
          <ToggleSwitch />

          <button
            onClick={handleAddClick}
            type="button"
            className="header__clothes-add-btn"
          >
            + Add clothes
          </button>



          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            </div>
          </Link>

        </div>
      </header>
    );
  } else {
    return (
      <header className="header">
        <Link to='/'>
          <img className="header__logo" src={logo} alt='header logo' />
        </Link>
        <p className="header__date-location">{currentDate} {weatherData.city}</p>
        <div className="header__actions">
          <ToggleSwitch />
        </div>
        <button className="header__signup" onClick={handleRegisterModal}>Sign Up</button>
        <button className="header__login" onClick={handleLoginModal}>Log In</button>
      </header>


    );
  }



}

export default Header;
