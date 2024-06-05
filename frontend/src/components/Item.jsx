import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react'
import '../estilos/Course.css';


const Item = ({course}) => {
    return (
        <>
            <div className='prueba'>
            {console.log(course)}
            </div>
            {/* <Card>
                <CardHeader>
                    <Heading size='md'>{course.nombre}</Heading>
                </CardHeader>
                <CardBody>
                    <Text>{course.descripcion}</Text>
                    <Text>{course.categoria}</Text>
                    <Text>{course.valoracion}</Text>
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Card> */}
        </>

    )
}

export default Item