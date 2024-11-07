import React from "react";
import ModalWithForm from "./ModalWithForm";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({
  handleCloseModal,
  isOpen,
  activeModal,
  onAddItem,
}) => {


  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({});
  }

  return (

    <ModalWithForm title="New garment" buttonText="Add garment" activeModal={activeModal}
      onClose={handleCloseModal} isOpen={isOpen} onSubmit={handleSubmit}
    >

      <label htmlFor="name" className="modal__lable">
        Name
        <input type="text" className="modal__input" id="name" placeholder="Name" />
      </label>

      <label className="modal__lable">
        Image
        <input type="url" className="modal__input" id="imageUrl" placeholder="Image URL"
        />
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input type="radio" className="modal__radio-input" id="hot" name="weather" />{" "}
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input type="radio" className="modal__radio-input" id="warm" name="weather" />{" "}
          Warm
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input type="radio" className="modal__radio-input" id="cold" name="weather" />{" "}
          Cold
        </label>

      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;