import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import "./Card.css";
import { useNavigate } from "react-router-dom";

function ActionAreaCard() {

  const navigate = useNavigate();
  

  return (
  <div id="card-container">
    <Card   
    sx={{
    maxWidth: 345,
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      '& .card-media': {
        opacity: 0.8, // Darken the image
      },
    },
  }}
  onClick={() => {
    navigate('/dashboard');
  }}>
      <CardActionArea>
        <CardMedia
          className="card-media"
          sx={{ opacity: 1, transition: 'opacity 0.3s ease' }}
          component="img"
          height="140"
          image="/kiacar.png"
          alt="dashboard"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Haz click aqui para ir al dashboard
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Card 
    sx={{
      maxWidth: 345,
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        '& .card-media': {
          opacity: 0.8, // Darken the image
        },
      },
    }}
    onClick={() => { 
      navigate('/registro');
   }}
>
      <CardActionArea>
        <CardMedia
          className="card-media"
          sx={{ opacity: 1, transition: 'opacity 0.3s ease' }}
          component="img"
          height="140"
          image="/kiacar.png"
          alt="dashboard"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Registro
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Haz click aqui para ir al registro
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </div>

    
  );
}

export default ActionAreaCard;