import React, { useEffect, useState } from 'react';

function SeeReviews({ isOpen, onClose, courseId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
       // if (!isOpen) return; // Evitar solicitudes innecesarias si el popup no está abierto

        fetch(`http://localhost:8080/comentarios/${courseId}`)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    }, [isOpen, courseId]);

    // Renderizar comentarios en tu componente JSX
    return (
        <div>
            <h2>Comentarios del Curso</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id_inscripcion}>
                        <p>{comment.comentario}</p>
                        <p>Valoración: {comment.valoracion}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SeeReviews;