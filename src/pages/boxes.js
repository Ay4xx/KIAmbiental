import React from 'react';
import './boxes.css';

function Boxes() {
    return (
      
    <div id='parent-container'>
      <div class="boxes_left">
        <img id='residues' src='./residuos.png'></img>
      </div>
      <div class="boxes_right">
        <div class="main_residues_box">
          <div id="box1" class="box">
            <div class="icon">
              <img src="./new-kia-logo-white.png" alt="Icon" class="icon-image"></img>
              <span class="icon-text">Residuos orgánicos</span>
            </div>
          </div>
          <div id="box2" class="box">
            <div class="icon">
              <img src="./new-kia-logo-white.png" alt="Icon" class="icon-image"></img>
              <span class="icon-text">Residuos solidos urbanos</span>
            </div>
          </div>
        </div>
        <div class="main_residues_box">
        <div id="box3" class="box">
            <div class="icon">
              <img src="./new-kia-logo-white.png" alt="Icon" class="icon-image"></img>
              <span class="icon-text">Residuos de manejo especial</span>
            </div>
          </div>
          <div id="box4" class="box">
            <div class="icon">
              <img src="./new-kia-logo-white.png" alt="Icon" class="icon-image"></img>
              <span class="icon-text">Residuos peligrosos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Boxes