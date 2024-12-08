import "../blocks/Profile.css";
import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";

function Profile({ 
  onCardClick, 
  clothingItems, 
  handleAddClick,
  handleLogOutClick
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleLogOutClick={handleLogOutClick}/>
      </section>


      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
