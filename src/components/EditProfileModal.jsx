import { useContext, useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import "../blocks/ModalWithForm.css";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import "../blocks/EditProfileModal.css";

const EditProfileModal = ({
  isOpen,
  closeActiveModal,
  onEditProfileSubmit,
  isLoading
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatarUrl] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value || "");
  };

  const handleAvatarChange = (e) => {
    setAvatarUrl(e.target.value || "");
  };

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfileSubmit({ name, avatar });
  }

  useEffect(() => {
    if (name.trim() && avatar.trim()) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [name, avatar]);


  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatarUrl(currentUser.avatar || "");
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      buttonText={isLoading? 'Saving...' : 'Save'}
      buttonClass={`modal__submit ${
        isButtonActive ? "modal__submit_active" : ""
      }`}
      title="Change Profile Data"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      name={"editprofile"}
    >

      <label className="modal__label">
        Name*{" "}
        <input
          required
          value={name}
          type="text"
          className="modal__input"
          id="name"
          placeholder={name}
          onChange={handleNameChange}
        />
      </label>

      <label className="modal__label">
        Avatar*{" "}
        <input
          required
          value={avatar}
          type="url"
          className="modal__input modal__input-avatar"
          id="avatar"
          placeholder={avatar}
          onChange={handleAvatarChange}
        />
      </label>

      {/* <button type="submit" className="modal__submit modal__save-changes">
        Save changes
      </button> */}

    </ModalWithForm>
  );
};
export default EditProfileModal;