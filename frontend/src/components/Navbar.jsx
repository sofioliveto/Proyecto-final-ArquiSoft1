import BurgerMenu from './BurgerMenu'
import '../estilos/Navbar.css';

export const Navbar = () => {
  return (
    <header>
      <div className='contenedor'>
        <div className='logoContainer'>
          <img src="/icon.png" alt="cafe y libros" width="100px" height="40px"/>
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
