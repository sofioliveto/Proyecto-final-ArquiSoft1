import React from 'react'
import Item from './Item'

// const ItemList = ({ courses }) => {
//     return (
//         <>
//             {courses.map((c) => {
//                 return (
//                     <Item
//                         key={c.key}
//                         course_id={c.course_id}
//                         nombre={c.nombre}
//                         profesor_id={c.profesor_id}
//                         categoria={c.categoria}
//                         descripcion={c.descripcion}
//                         valoracion={c.valoracion}
//                     />
//                 )
//             })

//             }
//         </>
//     )
// }

const ItemList = ({ courses }) => {

    return (
        <section>
        <div>
        {courses.map((item) => <Item course={item} key={item.course_id} />)}
        </div>
        </section>
    )
}

export default ItemList;