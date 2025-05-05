import React from 'react';
import './Card.css';

function Card({ title, image, text }) {
  return (
    <div className="card">
      {/* imagen  */}
      <img src={image} alt={title} className="card-image" />

      {/* texto */}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>  {/*  titulo */}
        <p className="card-text">{text}</p>     {/* descrip */}
      </div>
    </div>
  );
}

export default Card;