import "../blocks/Header.css"
import logo from "../images/logo.svg"
import avatar from "../images/avatar.svg"


function Header({ handleAddClick }) {
    const currentDate = new Date().toLocaleString('default', { 
        month: 'long', 
        day: 'numeric' 
    });
    return (
        <header className="header">
            <div className="header__group">
                <img className="header__logo" src={logo} alt="header logo"/>
                {/* <p className="header__date-and-location">June 15, New York</p> */}
                <p className="header__date-and-location">{currentDate}</p>
            </div>
            <div className="header__group">
                <button onClick={handleAddClick} type="button" className="header__clothes-add-btn">+ Add clothes</button>
                <div className="header__user-container">
                    <p className="header__username">Terrence tegegne</p>
                    <img src={avatar} alt="Terrence tegegne" className="header__avatar" />
                </div>
            </div>
        </header>
    )
}

export default Header;