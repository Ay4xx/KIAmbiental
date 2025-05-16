import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './slideshow.css'; // Import your CSS file for styling

const SlideshowBackground = () => {
  const images = [
    "21323_Concept_EV3.jpg",
    "21335_Concept_EV3.jpg",
    "21328_Concept_EV3.jpg", 
    "21474_Concept_EV4.jpg", 
    "21475_Concept_EV4.jpg", 
    "21476_Concept_EV4.jpg",
    "21494_Concept_EV3.jpg", 
    "21495_Concept_EV3.jpg", 
    "21703_PV_Concept.jpg", 
    "21709_PV_Concept.jpg", 
    "21719_PV_Concept.jpg",
    "21730_Kia_PBV_Concept.jpg",
  ];

  return (
    <div className="slideshow-background">
      <Slide
        duration={7000}
        transitionDuration={1500}
        infinite
        indicators={false}
        arrows={false}
        autoplay
      >
        {images.map((image, index) => (
          <div className="each-slide-bg" key={index}>
            <div
              className="slide-bg"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </div>
        ))}
      </Slide>

    </div>
  );
};

export default SlideshowBackground;
