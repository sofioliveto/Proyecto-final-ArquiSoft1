import React from 'react';
import '../estilos/Inscribirmebutton.css';

const SubscribeButton = () => {
  const handleSubscribe = () => {
    alert('Inscripción exitosa!');
  };

  return (
    <button className="subscribe-button" onClick={handleSubscribe}>
      INSCRIBIRME
    </button>
  );
};

export default SubscribeButton;