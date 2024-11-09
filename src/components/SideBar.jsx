import Avatar from "../images/avatar.svg"
import '../blocks/SideBar.css'
function SideBar() {
    return (
        <div className="sidebar">
        <img className="sidebar__Avatar" src={Avatar} alt="Default Avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    );
}

export default SideBar;
