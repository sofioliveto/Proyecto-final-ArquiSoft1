import { useState, useEffect } from 'react';
import ItemList from './ItemList';
import SearchBar from './SearchBar';
import BurgerMenu from './BurgerMenu';

export const ItemListContainer = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMyCourses, setShowMyCourses] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/search`)
            .then(response => response.json())
            .then(data => {
                setCourses(data);
                setFilteredCourses(data);
            })
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    const handleSearchResults = (results) => {
        setFilteredCourses(results);
    };

    const fetchCourseDetails = async (courseId) => {
        const response = await fetch(`http://localhost:8080/courses/${courseId}`);
        const courseData = await response.json();
        return courseData;
    };

    const handleMyCourses = async (userId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/inscripciones/${userId}`);
            const inscripciones = await response.json();
            const courseDetailsPromises = inscripciones.map((inscripcion) => fetchCourseDetails(inscripcion.id_course));
            const courseDetails = await Promise.all(courseDetailsPromises);
            setCourses(courseDetails);
            setFilteredCourses(courseDetails);
            setShowMyCourses(true);
        } catch (error) {
            console.error('Error fetching user courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setShowMyCourses(false);
    };

    return (
        <div>
            <BurgerMenu onLogout={handleLogout} onMyCourses={handleMyCourses} />
            <SearchBar onSearchResults={handleSearchResults} />
            {loading ? (
                <p>Cargando cursos...</p>
            ) : (
                <ItemList courses={filteredCourses} />
            )}
        </div>
    );
};
