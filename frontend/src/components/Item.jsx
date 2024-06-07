//import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Stack, Image } from '@chakra-ui/react'
import '../estilos/Course.css';
import Inscribirmebutton from "./Inscribirmebutton.jsx";
import React from "react";


const Item = ({ course }) => {
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                    <Heading size='md'>{course.Nombre}</Heading>

                    <Text py='2'>
                        {course.Descripcion}
                    </Text>
                    <Text py='2'>
                        <img src="/estrella.png" alt="estrella" width="20px" height="20px"/>{course.Valoracion}/5
                    </Text>
                    <Text py='2'>
                        {course.Categoria}
                    </Text>
                </CardBody>

                <CardFooter>
                    <Inscribirmebutton/>
                </CardFooter>
            </Stack>
        </Card>
    )
}

export default Item