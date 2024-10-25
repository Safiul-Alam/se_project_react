
import { useState } from 'react';
import '../blocks/App.css';
import Header from './Header';
import Main from './Main';
import ModalWithForm from './ModalWithForm';

function App() {
  const [weatherData ] = useState({type:"cold"});

  return (
    <div className='page'>
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData}/>
      </div>
        <ModalWithForm />
    </div>
      
  
  )
}

export default App;
