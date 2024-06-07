import '../estilos/Inscribirmebutton.css';
import {useParams} from "react-router-dom";
import Cookies from "js-cookie";

const CursoInscr=()=> {
  const {id} = useParams();
  const user_id = Number(Cookies.get('user_id'));
 // const [isAdmin, SetIsAdmin] = useState(false);
  const tokenUser = Cookies.get('token');


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user_id || user_id === -1 || user_id === 0 || !tokenUser) {
      alert("Debes registrarte para inscribirtre a un curso")
    } else {
      const currentDate = new Date();
      const storedDate = Cookies.get('Fecha_inicio');

      if (storedDate) {
        const [storedYear, storedMonth, storedDay] = storedDate.split('-').map(Number);
        const storedDateObject = new Date(storedYear, storedMonth - 1, storedDay);

        if (storedDateObject <= currentDate) {
          alert("El curso ya comenzó");
          return;
        }
      } else {
        console.log('No se encontró la cookie de Fecha_inicio');
      }

      try {
        const response = await fetch(`http://localhost:8080/inscripcion`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fecha_inscripcion: currentDate,
            id_course: id,
            id_user:user_id
          }),
        });

        if (response.ok) {
          alert("Inscripción exitosa! :)")
        }
      } catch (error) {
        console.log('Error al realizar la solicitud al backend:', error);
        alert("Error al realizar la inscripcion. Inténtalo de nuevo más tarde.");
      }
    }
  };


    return (
          <button className="subscribe-button"  onClick={handleSubmit}>
            INSCRIBIRME
          </button>
    );
}
  export default CursoInscr;