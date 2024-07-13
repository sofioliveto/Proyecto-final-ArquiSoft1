import React, {useEffect} from "react";
import Cookies from 'js-cookie'
import { Button, Input, FormControl, FormLabel } from "@chakra-ui/react";

const ValorarCourse =({courseId, onClose})=>{
    const [inscripcion_id, setInscripcion]=React.useState('');
    const user_id= parseInt(Cookies.get('user_id'));
    const [valoracion, setValoracion]=React.useState('');
    const [comentario, setComentario] = React.useState('');

}