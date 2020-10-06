import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import CheckoutPage from "./components/CheckoutPage.js"
import AddItem from "./components/AddItem.js"
function App() {
  return (
    <div className="container">     
      <br/>
      <CheckoutPage/>
      <AddItem />
    </div> 
    
  );
}

export default App;
