import { defaultClothingItems } from "../utils/constants";
import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css"

function ClothesSection({onCardClick, clothingItems}) {
    return (
        <div className="clothes-section">
            <div className="clothes__header">
                <p className="clothes__section-title">Your Items</p>
                <button className="clothes__section-add-button">+ Add New</button>
            </div>

            <ul className="cards__list">
                {clothingItems
                    .map((item) => {
                        return <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
                        
                    })}
            </ul>
        </div>
    );
}

export default ClothesSection;