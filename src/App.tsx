import React from 'react';
import './App.css';
import { MainPage } from "@pages";
/* import { initializeApp } from 'firebase/app'; */

function App() {

/*   const firebaseConfig = {
    apiKey: "AIzaSyA5kEgrfPSbolLZoYzADHl9f6t6TK_cYcI",
    authDomain: "my-pricesa.firebaseapp.com",
    databaseURL: "https://my-pricesa-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "my-pricesa",
    storageBucket: "my-pricesa.appspot.com",
    messagingSenderId: "213454878004",
    appId: "1:213454878004:web:712e71c986ff7e0f242161"
  }; 

  const app = initializeApp(firebaseConfig);*/
  return (
    <div className="App" >
      <MainPage />
    </div>
  );
}

export default App;
