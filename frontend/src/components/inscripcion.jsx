import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import {useNavigate, useParams} from 'react-router-dom';
import CustomModal from './CustomModal';
import CustomModal2 from "./CustomModal2.jsx";


const CursoInscr=()=>{
    const {id}=useParams();
    const [course,setCourse]=useState('');
    const [errorMessage,setErrorMessage]=useState('');
    const navigate=useNavigate();
    const [starDate,setStarDate]=useState('');
    const user_id =number(Cookies.get('user_id'));
    const [isAdmin, SetIsAdmin]=useState(false);
    const tokenUser=Cookies.get('token');
    const [showAlert1,setShowAlert1] = useState(false);
    const [showAlertInscrpcion,setShowInscripcion] = useState(false);

    const openAlert1=()=>{
        setShowAlert1(true);
    };
    const closeAlert1=()=>{
        setShowAlert1(false);
        navigate('/login')
    };
    const openAlertInscripcion =()=>{
        setShowInscripcion(true);
    }
    const inscripcionRealizada =()=>{
        setShowInscripcion(false);
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();

        if (!user_id||user_id===-1||user_id===0||!tokenUser){
            openAlert1()
        } else {
            const currentDate = new Date();
            const storedDate = Cookies.get('Fecha_inicio');

            if (storedDate) {
                const [storedYear, storedMonth, storedDay] = storedDate.split('-').map(Number);
                const storedDateObject = new Date(storedYear, storedMonth - 1, storedDay);

                if (storedDateObject <= currentDate) {
                    setErrorMessage('El curso ya comenzó');
                    return;
                }
            } else {
                console.log('No se encontró la cookie de fecha_inicio');
            }

            try {
                const response = await fetch(`http://localhost:8080/inscripcion`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fecha_inscripcion: currentDate,
                        id_course: course.id,
                        id_user: user_id
                    }),
                });

                if (response.ok) {
                    openAlertInscripcion()
                } else {
                    const errorData = await response.json();
                    setErrorMessage(errorData.message || "No hay mas cupos disponibles");
                }
            } catch (error) {
                console.log('Error al realizar la solicitud al backend:', error);
                setErrorMessage("Error al realizar la inscripcion. Inténtalo de nuevo más tarde.");
            }
        }
    }

    return (
        <div id="backCourseInscr">
            <CustomModal
                showModal={showAlert1}
                closeModal={closeAlert1}
                content="Debes iniciar sesión para poder inscribirte"
            />
            <CustomModal2
                showModal2={showAlertInscrpcion}
                closeModal2={inscripcionRealizada}
                closeModal22={"../App"}
                content2="Inscripcion CONFIRMADA"
            />

        </div>

    );
};

export default CursoInscr;
