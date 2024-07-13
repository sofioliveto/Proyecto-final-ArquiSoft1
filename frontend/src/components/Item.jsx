import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Stack, Card, CardBody, CardFooter, Text, Image, useDisclosure } from "@chakra-ui/react";
import Inscribirmebutton from "./Inscribirmebutton.jsx";
import PopupEdit from "./PopUpEdit.jsx";
import '../estilos/Inscribirmebutton.css';
import '../estilos/Course.css';

const Item = ({ course, bandera }) => {
    const [userId, setUserId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const { isOpen: isPopupOpenEdit, onOpen: onOpenPopupEdit, onClose: onClosePopupEdit } = useDisclosure();

    const formattedDate = new Date(course.fecha_inicio).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

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

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8080/inscripciones/${userId}`)
                .then(response => {
                    const userCourses = response.data;
                    const isUserEnrolled = userCourses.some(userCourse => userCourse.id === course.course_id);
                    setIsEnrolled(isUserEnrolled);
                })
                .catch(error => {
                    console.error("Error fetching courses", error);
                });
        }
    }, [userId, course.course_id]);

    const getProfesorName = (profesor_id) => {
        const profesores = {
            2: 'Juan Lopez',
            4: 'Margarita de Marcos',
            8: 'Gustavo Jacobo',
            17: 'Rodolfo Perez',
            18: 'Sebastian Colidio',
            19: 'Lucas Beltran'
        };
        return profesores[profesor_id] || 'Profesor desconocido';
    };

    const handleEditCourse = () => {
        onOpenPopupEdit();
    };

    return (
        <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
            {bandera !== 1 ? (
                <Image
                    objectFit='cover'
                    maxW={{ sm: '250px' }}
                    src={course.url_image}
                    alt='Imagen Curso'
                />
            ) : null}

            <Stack>
                <CardBody className='body'>
                    <h1 style={{ fontFamily: 'Spoof Trial, sans-serif', fontWeight: 800, fontSize: 30 }}>{course.nombre}</h1>

                    <Text py='2' className="card-text">{course.descripcion}</Text>
                    <Text py='2' className="card-text">{course.categoria}</Text>
                    <Text marginBottom='3px' display='flex' py='2' alignItems='center' className="card-text">
                        <img src="/estrella.png" alt="estrella" width="20px" height="20px" style={{ marginRight: '5px' }} />
                        {course.valoracion}/5
                    </Text>
                    <Text className="card-textt">Duracion: {course.duracion}hs</Text>
                    <Text className="card-textt">Fecha de inicio: {formattedDate}</Text>
                    <Text className="card-textt">Requisito: Nivel {course.requisitos}</Text>
                    <Text className="card-textt">Profesor: {getProfesorName(course.profesor_id)}</Text>
                </CardBody>
                <CardFooter>
                    {userId && (
                        isAdmin ? (
                            <>
                                <Button w="100%" style={{ fontFamily: 'Spoof Trial, sans-serif' }}>Editar curso</Button>
                                <Button w="100%" style={{ fontFamily: 'Spoof Trial, sans-serif' }}>Eliminar curso</Button>
                            </>
                        ) : (
                            isEnrolled ? (
                                <>
                                    <Button w="100%" style={{ fontFamily: 'Spoof Trial, sans-serif' }}>Valorar y Comentar</Button>
                                    <Button w="100%" style={{ fontFamily: 'Spoof Trial, sans-serif' }}>Subir Archivo</Button>
                                </>
                            ) : (
                                bandera !== 1 ? (
                                    <Inscribirmebutton courseId={course.course_id} />
                                ) : null
                            )
                        )
                    )}
                </CardFooter>
            </Stack>
            <PopupEdit isOpen={isPopupOpenEdit} onClose={onClosePopupEdit} courseId={course.course_id} />
        </Card>
    );
};

export default Item;
