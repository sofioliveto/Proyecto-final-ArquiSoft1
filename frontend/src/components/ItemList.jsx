import React from 'react'
import Item from './Item'

const ItemList = ({ courses }) => {
    // { console.log(courses) }
    return (
        <section>
            <div>
                {courses.map((course) => <Item course={course} key={course.course_id} />)}
            </div>
        </section>
    )
}

export default ItemList;