import React, { useState } from 'react';
import { Header } from './components/Header';
import { Cart } from './components/Cart';
import { Home } from './components/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
      <div className={darkTheme ? 'dark' : ''}>
        <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>
        <Routes>
          <Route path='/' exact element={<Home />} />

          <Route path='/cart' exact element={<Cart />} />
        </Routes>
      </div>
  );
}

export default App;
