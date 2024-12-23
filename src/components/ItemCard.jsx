import "../blocks/ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ItemCard({
  item,
  onCardClick,
  onToggleLike,
  isLoggedIn,
  likedItems,
  handleCardLike,

}) {
  // console.log(item)
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleCardClick = () => {
    // console.log(onCardClick)
    onCardClick(item);
  };

  const handleLike = () => {
    handleCardLike(item._id, isLiked);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>

      {isLoggedIn && (
        <button
          onClick={handleLike}
          className={`card__like-btn ${isLiked ? "card__like-btn_liked" : ""}`}
        ></button>
      )}

      <img
        onClick={handleCardClick}

        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
