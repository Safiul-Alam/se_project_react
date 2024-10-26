import "../blocks/ItemModal.css";

function ItemModal({ activeModal, onClose, cardData }) {
    return (
        <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
            <div className="modal__content modal__content_type_image">
            <button onClick={onClose} 
                type="button" className="modal__close"> X
            </button>
            <img src={cardData.link} alt="" className="modal__image" />
            <div className="modal__footer">
                <h2 className="modal__caption">{cardData.name}</h2>
                <p className="modal__weather">Weather: {cardData.weather}</p>
            </div>
            </div>
        </div>
    )

}

export default ItemModal;