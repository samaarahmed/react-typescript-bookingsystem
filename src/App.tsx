import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Minasidor from './components/Minasidor';
function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/homepage" element ={<Homepage></Homepage>} ></Route>
      <Route path="/minasidor" element ={<Minasidor></Minasidor>} ></Route>

      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
