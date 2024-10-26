
import { useState } from 'react';
import '../blocks/App.css';
import Header from './Header';
import Main from './Main';
import ModalWithForm from './ModalWithForm';
import ItemModal from './ItemModal';

function App() {
  const [weatherData ] = useState({type:"cold"});
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleAddClick = () => {
    setActiveModal("Add-garment");
  }

  const closeActiveModal = () => {
    setActiveModal ("");
  }

  const handleCardClick = (cardData) => {
    setActiveModal ("preview");
    setSelectedCard(cardData);
  }

  return (
    <div className='page'>
      <div className="page__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
        <ModalWithForm 
        title= "New Garment" 
        buttonText= "Add garment" 
        activeModal={activeModal} 
        onClose = {closeActiveModal}
        >
          <label htmlFor="name" className="modal__lable">
                        Name 
                        <input type="text" className="modal__input" id="name" placeholder='Name'/>
          </label>
          <label htmlFor="imageUrl" className="modal__lable">
                        Image 
                        <input type="url" className="modal__input" id="name" placeholder='Image URL'/>
          </label>

          <fieldset className="modal__radio-buttons">
                        <legend className="modal__legend">
                            Select the weather type:
                        </legend>
                        <label htmlFor="hot" className="modal__label modal__label_type_radio">
                            <input type="radio" className="modal__radio-input" id="hot"/> Hot
                        </label>
                        <label htmlFor="warm" className="modal__label modal__label_type_radio">
                            <input type="radio" className="modal__radio-input" id="warm"/> Warm
                        </label>
                        <label htmlFor="cold" className="modal__label modal__label_type_radio">
                            <input type="radio" className="modal__radio-input" id="cold"/> Cold
                        </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal activeModal={activeModal} 
          cardData={selectedCard} onClose={closeActiveModal}/>
    </div>
      
  
  )
}

export default App;
