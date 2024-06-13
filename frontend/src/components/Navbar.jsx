import BurgerMenu from './BurgerMenu'
import Cookies from 'js-cookie';
import '../estilos/Navbar.css';

export const Navbar = () => {
  const userId = Cookies.get('user_id');// Obtener el estado de inicio de sesión desde la cookie
  console.log(userId);
  return (
    <header>
      <div className='contenedor'>
        <div className='logoContainer'>
          <img src="/icon.png" alt="cafe y libros" width="100px" height="40px"/>
        </div>
        <div className='titleContainer'>
          Coffee&Learn
        </div>
        <div>
          {userId ? (
              <h1>Bienvenido, Usuario</h1>
          ) : (
              <h1>Inicia sesión para continuar</h1>
          )}
        </div>
        <div className='menu'>
          <BurgerMenu/>
        </div>
      </div>
    </header>
  )
}
