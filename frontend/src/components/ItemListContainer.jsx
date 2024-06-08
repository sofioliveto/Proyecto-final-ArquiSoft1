import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';

export const ItemListContainer = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/search`)
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error('Error fetching courses:', error));
    }, [])

    return (
        <>
            <ItemList courses={courses} />
            {/* {courses.map((c) => {
            console.log(c)
        })}
        {console.log(courses)} */}
        </>
    )
}
