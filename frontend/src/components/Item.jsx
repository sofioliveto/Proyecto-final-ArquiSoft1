import {Card, CardBody, CardFooter, Text, Stack, Image, Button} from '@chakra-ui/react';
import '../estilos/Course.css';
import Inscribirmebutton from "./Inscribirmebutton.jsx";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";

const Item = ({ course }) => {
    const [userId, setUserId] = useState(null); // Inicialmente null
    const [isAdmin, setIsAdmin] = useState(false);

    const formattedDate = new Date(course.fecha_inicio).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const validUserId = typeof userId === 'number' ? userId : parseInt(userId, 10);

    useEffect(() => {
        const storedUserId = Cookies.get('user_id');
        if (storedUserId) {
            setUserId(parseInt(storedUserId, 10));
        }

        const storedAdmin = Cookies.get('admin');
        if (storedAdmin) {
            setIsAdmin(storedAdmin === "1"); // Convert to boolean
        }
    }, []);

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

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Image
                objectFit='cover'
                maxW={{ sm: '250px' }}
                src={course.url_image}
                alt='Imagen Curso'
            />

            <Stack>
                <CardBody className='body'>
                    <h1 style={{ fontFamily: 'Spoof Trial, sans-serif', fontWeight: 800, fontSize: 30 }}>{course.nombre}</h1>

                    <Text py='2' className="card-text">
                        {course.descripcion}
                    </Text>
                    <Text py='2' className="card-text">
                        {course.categoria}
                    </Text>
                    <Text marginBottom='3px' display='flex' py='2' alignItems='center' className="card-text">
                        <img src="/estrella.png" alt="estrella" width="20px" height="20px" style={{ marginRight: '5px' }} />
                        {course.valoracion}/5
                    </Text>
                    <Text className="card-textt">
                        Duracion: {course.duracion}hs
                    </Text>
                    <Text className="card-textt">
                        Fecha de inicio: {formattedDate}
                    </Text>
                    <Text className="card-textt">
                        Requisito: Nivel {course.requisitos}
                    </Text>
                    <Text className="card-textt">
                        Profesor: {getProfesorName(course.profesor_id)}
                    </Text>
                </CardBody>
                <CardFooter>
                    {validUserId ? (
                        isAdmin ? (
                            <>
                                <Button w="100%" style={{fontFamily: 'Spoof Trial, sans-serif'}}>Editar curso</Button>
                                <Button w="100%" style={{fontFamily: 'Spoof Trial, sans-serif'}}>Eliminar curso</Button>
                            </>
                        ) : (
                            <Inscribirmebutton courseId={course.course_id} />
                        )
                    ) : null}

                </CardFooter>
            </Stack>
        </Card>
    );
};

export default Item;