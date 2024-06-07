import React from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

const Login = () =>{
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('');
    const [password, setPassword]=React.useState('');



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
                // Envía la respuesta al backend (Postman, básicamente)
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email, password}),
                }).then((response) => {
                    console.log(response.status)
                    if (response.ok) {
                        console.log("hizo el return")
                        return response.json();
                    } else {
                        alert ("usuario no registrado")
                        console.log("hizo el error")
                    }
                });
                if (response.id_user) {
                    // Si el usuario existe
                    // El usuario está en la base de datos
                    console.log('Usuario válido');

                    Cookies.set('user_id', response.id_user)
                    Cookies.set('email', email)
                    Cookies.set('token', response.token)
                    Cookies.set('type', response.admin)
                    navigate('../App');
                    window.location.reload();
                }
            } catch (error) {
                Cookies.set('user_id', "-1")

                console.log('Error al realizar la solicitud al backend:', error);
            }
        }
    };


    return (
        <div id="body">
            <h1 id="h1Login">Iniciar sesión</h1>
            <form id="formLogin" onSubmit={handleSubmit}>
                <input
                    id={'inputEmailLogin'}
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    id={'inputPasswordLogin'}
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button id="botonLogin" type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};


export default Login;