import "../blocks/ItemModal.css";
import { useContext } from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function ItemModal({ activeModal, 
  onClose, 
  cardData, 
  handleDeleteClick 
}) {
  const currentUser = useContext(CurrentUserContext); 
  const isOwner = cardData.owner === currentUser._id; 

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>

        <img
          src={cardData.imageUrl}
          alt={cardData.name}
          className="modal__image"
        />

        <div className="modal__footer">
          <h2 className="modal__caption">{cardData.name}</h2>
          <p className="modal__weather">Weather: {cardData.weather}</p>
        </div>

        {isOwner && (
          <button
            type="button"
            className="item-modal__delete-btn"
            onClick={handleDeleteClick}
          >
            Delete Item
          </button>
        )}
        {!isOwner && (
          <p className="modal__no-permission">You cannot delete this item.</p>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
