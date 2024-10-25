import '../blocks/ModalWithForm.css';


function ModalWithForm(
    
){
    return (
        <div className="modal">
            <form action="" className="modal__form">
                <h2 className="modal__title">New garment</h2>
                <button type="button" className="modal__close">close</button>
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
            </form>
        </div>
    );
    
}

export default ModalWithForm;