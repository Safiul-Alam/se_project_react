import "../blocks/Profile.css";
import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";

function Profile({ onCardClick }) {
    return (
        <div className="profile">
      <section className="profile__sidebar"></section>
      <SideBar />
      
      <section className="profile__clothing-items">
        <ClothesSection onCardClick={onCardClick} />
      </section>
        </div>

    );
}

export default Profile;
