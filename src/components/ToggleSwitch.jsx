import "../blocks/ToggleSwitch.css";
import React, { useContext, useState } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  // console.log("toggle switch")
  // const [currentTemperatureUnit, handleToggleSwitchChange] = useState("C");

  // const handleChange = (e) => {
  //     if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
  //     if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  // }
  // console.log(currentTemperatureUnit);

  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  //   console.log(currentTemperatureUnit)

  return (
    <label className="switch">
      <input
        className="switch__box"
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider  switch__slider-F"
            : "switch__slider  switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
