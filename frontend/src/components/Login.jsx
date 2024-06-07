import React, {useState} from 'react';
import Cookies from 'js-cookie';
import CustomModal from '../components/CustomModal.jsx';
import {useNavigate} from 'react-router-dom';

const Login = () =>{
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword]=useState('');

    const [showAlert1, setShowAlert1] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);

    const openAlert1 = () => {
        setShowAlert1(true);
    };
    const closeAlert1 = () => {
        setShowAlert1(false);
    };
    const openAlert2 = () => {
        setShowAlert2(true);
    };
    const closeAlert2 = () => {
        setShowAlert2(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Para que no recargue la página
        let emptyLogin = false;

        if (email === '') {
            document.getElementById('inputEmailLogin');
            emptyLogin = true;
        } else {
            document.getElementById('inputEmailLogin');
        }

        if (password === '') {
            document.getElementById('inputPasswordLogin');
            emptyLogin = true;
        } else {
            document.getElementById('inputPasswordLogin');
        }

        if (!emptyLogin) {
            try {
                // Envía la solicitud de inicio de sesión al backend
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email, password}),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    if (responseData.id_user) {
                        // Si el usuario existe
                        console.log('Usuario válido');
                        Cookies.set('user_id', responseData.id_user);
                        Cookies.set('email', email);
                        Cookies.set('token', responseData.token);
                        Cookies.set('admin', responseData.admin);
                        navigate('../App');
                        window.location.reload();
                    } else {
                        openAlert1();
                    }
                } else {
                    openAlert1();
                    console.log("Error en la respuesta del servidor");
                }
            } catch (error) {
                console.log('Error al realizar la solicitud al backend:', error);
            }
        } else {
            openAlert2();
        }
    };


    return (
        <div id="body">
            <CustomModal
                showModal={showAlert2}
                closeModal={closeAlert2}
                content="Debes completar todos los campos"
            />
            <CustomModal
                showModal={showAlert1}
                closeModal={closeAlert1}
                content="Usuario no registrado"
            />

        </div>
    );
};


export default Login;