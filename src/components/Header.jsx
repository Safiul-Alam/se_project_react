import { Link } from "react-router-dom";
import "../blocks/Header.css";
import logo from "../images/logo.svg";
import avatar from "../images/avatar.svg";
import TottleSwitch from "./ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
    const currentDate = new Date().toLocaleString("default", {
        month: "long",
        day: "numeric",
    });

    return (
        <header className="header">

            <div className="header__group ">
                <Link to="/" className="header__link">
                    <img className="header__logo" src={logo} alt="header logo" />
                </Link>

                {/* <p className="header__date-and-location">June 15, New York</p> */}
                <p className="header__date-and-location">
                    {currentDate}, {weatherData.city}
                </p>
            </div>

            <div className="header__group ">
                <TottleSwitch />
                <button
                    onClick={handleAddClick}
                    type="button"
                    className="header__clothes-add-btn"
                >
                    + Add clothes
                </button>

                <Link to="/profile" className="header__link">
                    <div className="header__user-container">
                        <p className="header__username">Terrence tegegne</p>
                        <img src={avatar} alt="Terrence tegegne" className="header__avatar" />
                    </div>
                </Link>

            </div>

        </header>
    );
}

export default Header;
