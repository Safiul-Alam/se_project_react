import "../blocks/Header.css"
import logo from "../images/logo.svg"
import avatar from "../images/avatar.svg"


function Header() {

    return (
        <header className="header">
            <div className="header__group">
                <img className="header__logo" src={logo} />
                <p className="header__date-and-location">June 15, New York</p>
            </div>
            <div className="header__group">
                <button className="header__clothes-add-btn">+ Add clothes</button>
                <div className="header__user-container">
                    <p className="header__username">Terrence tegegne</p>
                    <img src={avatar} alt="Terrence tegegne" className="header__avatar" />
                </div>
            </div>
        </header>
    )
}

export default Header;