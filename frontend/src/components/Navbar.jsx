import React from 'react'
import BurgerMenu from './BurgerMenu'
import '../estilos/Navbar.css';

export const Navbar = () => {
  return (
    <header>
      <div className='container'>
        <div className='logoContainer'>
          <img src="/favicon.jpg" alt="cafe y libros" />
        </div>
        <div className='titleContainer'>
          Coffee&Learn
        </div>
        <div className='menu'>
          <BurgerMenu />
        </div>
      </div>
    </header>
  )
}
