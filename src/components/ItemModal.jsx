import "../blocks/ItemModal.css";

function ItemModal({ 
  activeModal, 
  onClose, 
  cardData, 
  handleDeleteClick 
}) {
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

        <button
          type="button"
          className="item-modal__delete-btn"
          onClick={handleDeleteClick}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
