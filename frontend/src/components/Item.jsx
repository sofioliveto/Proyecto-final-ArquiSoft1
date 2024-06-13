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
                alt='Imagen Curso'git
            />

            <Stack>
                <CardBody className='body'>
                    <Heading className="card-heading">{course.nombre}</Heading>

                    <Text py='2' className="card-text">
                        {course.descripcion}
                    </Text>
                    <Text py='2' className="card-text">
                        {course.categoria}
                    </Text>
                    <Text py='2' display='flex' alignItems='center' className="card-text">
                        <img src="/estrella.png" alt="estrella" width="20px" height="20px" style={{ marginRight: '5px' }}/>
                        {course.valoracion}/5
                    </Text>
                </CardBody>
                <CardFooter>
                    <Inscribirmebutton courseId={course.course_id} />
                </CardFooter>
            </Stack>
        </Card>
    )
}

export default Item