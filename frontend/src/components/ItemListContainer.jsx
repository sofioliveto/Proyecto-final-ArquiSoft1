import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';

export const ItemListContainer = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/courses.json');
                setCourses(response.data);
                // const response = await fetch('/courses.json');
                // const jsonData = await response.json();
                // setCourses(jsonData);
            } catch (error) {
                console.error(error)
            }
        }

        fetchCourses()
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
