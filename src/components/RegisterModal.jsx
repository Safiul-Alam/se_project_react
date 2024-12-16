import React, { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import "../blocks/ModalWithForm.css";
import "../blocks/RegisterModal.css";

export default function RegisterModal({
  closeActiveModal,
  isOpen,
  isLoading,
  onRegister,
  handleLoginClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // function handleEmailChange(e) {
  //   setEmail(e.target.value);
  // }

  // function handlePasswordChange(e) {
  //   setPassword(e.target.value);
  // }

  // function handleNameChange(e) {
  //   setName(e.target.value);
  // }

  // function handleAvatarChange(e) {
  //   setAvatar(e.target.value);
  // }

  function handleRegister(e) {
    e.preventDefault();
    console.log("modal submitted");
    onRegister({ email, password, name, avatar })
      .then(() => {
        setEmail("");
        setPassword("");
        setName("");
        setAvatar("");
      })
  }

  return (
    <ModalWithForm
      buttonText={isLoading ? "Registering..." : "Sign Up"}
      title="Register"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleRegister}
    >
      <label className="modal__label">
        Email{" "}
        <input
          required
          value={email}
          autoComplete="off"
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="modal__label">
        Password{" "}
        <input
          required
          value={password}
          autoComplete="off"
          type="text"
          className="modal__input"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className="modal__label">
        Name{" "}
        <input
          required
          value={name}
          autoComplete="off"
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="modal__label">
        Avatar Url{" "}
        <input
          required
          value={avatar}
          type="url"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>
      <button
        type="button"
        onClick={handleLoginClick}
        className="modal__login-btn"
      >
        Or Log In
      </button>
    </ModalWithForm>
  );
}
