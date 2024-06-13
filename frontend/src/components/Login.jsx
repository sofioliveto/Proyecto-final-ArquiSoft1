import React from 'react';
import Cookies from 'js-cookie';
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import '../estilos/Login.css'

const PasswordInput = ({ password, setPassword }) => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup size='md' className='inputContrasena'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Ingrese su contraseña...'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Ocultar' : 'Mostrar'}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};

const Login = ({ onClose }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    Cookies.set('user_id', 0);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Para que no recargue la página
        let emptyLogin = false;

        if (email === '') {
            document.getElementById('inputEmailLogin');
            emptyLogin = true;
        }

        if (password === '') {
            document.getElementById('inputPasswordLogin');
            emptyLogin = true;
        }

        if (!emptyLogin) {
            try {
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }).then((response) => {
                    if (response.ok) {
                        return response.json();

                    } else {
                        alert("Usuario no registrado");
                    }
                });

                if (response.id_user) {
                    Cookies.set('user_id', response.id_user);
                    Cookies.set('email', email);
                    Cookies.set('token', response.token);
                    Cookies.set('type', response.admin);
                    window.location.reload();
                }
            } catch (error) {
                Cookies.set('user_id', "-1");
                console.log('Error al realizar la solicitud al backend:', error);
            }
        }
    };

    return (
        <form id="formLogin" onSubmit={handleSubmit}>
            <Input
                className='inputEmail'
                id={'inputEmailLogin'}
                placeholder="Ingrese su correo electrónico..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput password={password} setPassword={setPassword} />
            <Button colorScheme="blue" mr={3} type="submit" onClick={onClose}>
                Iniciar sesión
            </Button>
        </form>
    );
};

export default Login;
