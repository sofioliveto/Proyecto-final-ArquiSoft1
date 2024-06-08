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
                src={course.url_image}
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                    <Heading size='md'>{course.nombre}</Heading>

                    <Text py='2'>
                        {course.descripcion}
                    </Text>
                    <Text py='2'>
                        <img src="/estrella.png" alt="estrella" width="20px" height="20px"/>{course.valoracion}/5
                    </Text>
                    <Text py='2'>
                        {course.categoria}
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