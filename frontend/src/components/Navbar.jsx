import BurgerMenu from './BurgerMenu';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import '../estilos/Navbar.css';

const Navbar = () => {
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMyCourses, setShowMyCourses] = useState(false);

  useEffect(() => {
    const storedUserId = Cookies.get('user_id');
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }

    const storedAdmin = Cookies.get('admin');
    if (storedAdmin) {
      setIsAdmin(storedAdmin === "1");
    }
  }, []);

  const fetchCourseDetails = async (courseId) => {
    const response = await fetch(`http://localhost:8080/courses/${courseId}`);
    const courseData = await response.json();
    return courseData;
  };

  const handleMyCourses = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/inscripciones/${userId}`);
      const inscripciones = await response.json();
      const courseDetailsPromises = inscripciones.map((inscripcion) => fetchCourseDetails(inscripcion.id_course));
      const courseDetails = await Promise.all(courseDetailsPromises);
      setCourses(courseDetails);
      setFilteredCourses(courseDetails);
      setShowMyCourses(true);
    } catch (error) {
      console.error('Error fetching user courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove('user_id');
    Cookies.remove('email');
    Cookies.remove('token');
    Cookies.remove('admin');
    setUserId(null);
    setIsAdmin(false);
    setUserCourses([]);
    window.location.reload();
  };

  const validUserId = typeof userId === 'number' ? userId : parseInt(userId, 10);

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
            <h1 style={{ fontFamily: 'Spoof Trial, sans-serif' }}>
              {validUserId ? (
                  isAdmin ? 'Bienvenido administrador' : 'Bienvenido alumno'
              ) : (
                  'Inicie sesión'
              )}
            </h1>
          </div>
          <div className='menu'>
            <BurgerMenu onLogout={handleLogout} onMyCourses={handleMyCourses} />
          </div>
        </div>
      </header>
  );
};

export { Navbar };
