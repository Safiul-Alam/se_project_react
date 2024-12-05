import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import "../blocks/AddItemModal.css";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ onCloseModal, isOpen, onAddItem }) => {
  const [name, setName] = useState("");
  const [link, setUrl] = useState("");

  const handleNameChange = (e) => {
    // console.log(e.target.value);
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    // console.log(e.target.value);
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   onAddItem(e);
  // }
  // const resetCurrentForm = () => {
  //   resetForm({ name: "", imageUrl: "", weather: "" });
  // };

  const resetInputs = () => {
    setName("");
    setWeather("");
    setUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddItem({ name, weather: weather, imageUrl: link, resetInputs });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={onCloseModal}
      isOpen={isOpen}
      // onSubmit={(e) => onAddItem(e, { name, link })}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__lable">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>

      <label className="modal__lable">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={link}
          onChange={handleUrlChange}
        />
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            value="hot"
            name="weather"
            onChange={handleWeatherChange}
          />{" "}
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            value="warm"
            name="weather"
            onChange={handleWeatherChange}
          />{" "}
          Warm
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            value="cold"
            name="weather"
            onChange={handleWeatherChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
