// Cole este código em Card.jsx
import React from 'react';
import './Card.css'; // Estilos para este componente

const Card = ({ children }) => {
  return <div className="ui-card">{children}</div>;
};

export default Card;