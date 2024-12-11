import "../blocks/Profile.css";
import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleLogOutClick,
  handleEditProfileClick,
  isLoggedIn,
  
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleLogOutClick={handleLogOutClick}
          onEditProfileData={handleEditProfileClick}
          handleEditProfileClick={handleEditProfileClick}
        />
      </section>


      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}

export default Profile;
