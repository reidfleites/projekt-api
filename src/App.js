
import "./App.scss";
import Dictionary from "./components/Dictionary";
import {Context} from './Context';
import Header from './components/Header';
import { useState } from "react";

function App() {
 const [flag,setFlag]=useState(false);
  return (
   
    <div className="App">
       <Context.Provider value={{flag,setFlag}}>
       
      <Header />
      <Dictionary />
      </Context.Provider>
    </div>
  );
}

export default App;
