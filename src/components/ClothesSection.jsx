// import { defaultClothingItems } from "../utils/constants";
import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

function ClothesSection({ 
  onCardClick, 
  clothingItems, handleAddClick, 
  isLoggedIn, handleCardLike }) {
  return (
    <div className="clothes-section">
      <div className="clothes__header">
        <p className="clothes__section-title">Your Items</p>

        <button
          className="clothes__section-add-button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>

      <ul className="cards__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item}
              onCardClick={onCardClick}
              isLoggedIn={isLoggedIn}
              handleCardLike={handleCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
