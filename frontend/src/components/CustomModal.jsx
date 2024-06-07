import React from 'react';
import './Components.css'
const CustomModal = ({ showModal, closeModal, content }) => {
    return (
        <>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>{content}</p>
                        <button className='buttonModal' onClick={closeModal}>Aceptar</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomModal;
