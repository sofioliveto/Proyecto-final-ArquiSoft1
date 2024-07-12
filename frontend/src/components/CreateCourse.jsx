import React from 'react';
import Cookies from 'js-cookie';
import { Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import '../estilos/CreateCourse.css';

const CreateCourse = ({ onClose }) => {
    const [nombre, setNombre] = React.useState('');
    const profesor_id = Cookies.get('user_id');
    const [categoria, setCategoria] = React.useState('');
    const [descripcion, setDescripcion] = React.useState('');
    const [duracion, setDuracion] = React.useState('');
    const [requisitos, setRequisitos] = React.useState('');
    const [url_image, setUrl_image] = React.useState('');
    const [fecha_inicio, setFecha_inicio] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nombre === '' || categoria === '' || descripcion === '' || duracion === '' || requisitos === '' || url_image === '' || fecha_inicio === '') {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/createCourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({ nombre, profesor_id, categoria, descripcion, duracion, requisitos, url_image, fecha_inicio })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(`Error al crear el curso: ${errorData.message}`);
            } else {
                alert('Curso creado exitosamente');
                onClose(); // Cierra el formulario
            }
        } catch (error) {
            setErrorMessage(`Error de red al crear el curso: ${error.message}`);
        }
    };

    return (
        <form id="formCreateCourse" onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel>Nombre del curso</FormLabel>
                <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Categoría</FormLabel>
                <Input value={categoria} onChange={(e) => setCategoria(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Descripción</FormLabel>
                <Input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Duración</FormLabel>
                <Input value={duracion} onChange={(e) => setDuracion(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Requisitos</FormLabel>
                <Input value={requisitos} onChange={(e) => setRequisitos(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>URL de la imagen</FormLabel>
                <Input value={url_image} onChange={(e) => setUrl_image(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Fecha de inicio</FormLabel>
                <Input type="date" value={fecha_inicio} onChange={(e) => setFecha_inicio(e.target.value)} />
            </FormControl>
            {errorMessage && <p>{errorMessage}</p>}
            <Button type="submit">Crear curso</Button>
        </form>
    );
};

export default CreateCourse;
