import React from 'react'
import Inscribirmebutton from './Inscribirmebutton'


export const Course = () => {
  return (
    <div className='container'>
    <div className='textcontainer'>
    <title>Nombre del curso</title>
    <h4>Descripcion del curso</h4>
    <p></p>
    <h3>
    <img src="/estrella.png" alt="estrella" />
    Valoracion/5
    </h3>
    <h5>Duracion - Fecha de inicio - Requisitos - Categoria</h5>
    </div>
    <Inscribirmebutton/>
    </div>
  )
}
