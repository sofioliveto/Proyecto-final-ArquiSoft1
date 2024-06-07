//import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react'
import '../estilos/Course.css';
import Inscribirmebutton from "./Inscribirmebutton.jsx";


const Item = ({ course }) => {
    return (
        <>
            {/* <div className='prueba'>
                Nombre: {course.Nombre}
                {console.log(course)}
            </div> */}
            <Card>
                <CardHeader>
                    <Heading size='md'>{course.Nombre}</Heading>
                </CardHeader>
                <CardBody>
                    <Text>{course.Descripcion}</Text>
                    <Text>{course.Categoria}</Text>
                    <Text>{course.Valoracion}</Text>
                </CardBody>
                <CardFooter>
                    <Inscribirmebutton/>
                </CardFooter>
            </Card>
        </>

    )
}

export default Item