import BurgerMenu from './BurgerMenu'
import Cookies from 'js-cookie';
import {useState} from "react";
import '../estilos/Navbar.css';

export const Navbar = () => {
  const [userId, setUserId] = useState(Cookies.get('user_id')); // Obtener el estado de inicio de sesión desde la cookie

  const handleLogout = () => {
    setUserId(null); // Actualizar el estado cuando se cierre la sesión
  };

  return (
      <header>
        <div className='contenedor'>
          <div className='logoContainer'>
            <img src="/icon.png" alt="cafe y libros" width="100px" height="40px"/>
          </div>
          <div className='titleContainer'>
            Coffee&Learn
          </div>
          <div id='welcomeMessage'>
            {userId ? (
                <h1 style={{fontFamily: 'Spoof Trial, sans-serif'}}>Bienvenid@!</h1>
            ) : (
                <h1 style={{fontFamily: 'Spoof Trial, sans-serif'}}>Inicia sesión para inscribirte a cursos!</h1>
            )}
          </div>
          <div className='menu'>
            <BurgerMenu onLogout={handleLogout} />
          </div>
        </div>
      </header>
  );
}
