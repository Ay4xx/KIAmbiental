import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import "./Card.css";
import { useNavigate } from "react-router-dom";

import { useTranslation } from 'react-i18next';

function ActionAreaCard() {

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  return (
  <div id="card-container"
  style={{
    display: 'flex',
    flexDirection: 'row',
    gap: '32px',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    background: 'rgba(19, 19, 19, 0.4)', // <-- semi-transparent white
    borderRadius: 24,
    padding: 32,
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    backdropFilter: 'blur(1.5px)'
  }}>
    <Card   
    sx={{
    maxWidth: 420,
    width: '100%',
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
            {t('cards.card1')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('cards.text1')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Card 
    sx={{
      maxWidth: 420,
      width: '100%',
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
            {t('cards.card2')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('cards.text2')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Card 
    sx={{
      maxWidth: 420,
      width: '100%',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        '& .card-media': {
          opacity: 0.8, // Darken the image
        },
      },
    }}
    onClick={() => { 
      navigate('/tablas');
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
            {t('cards.card3')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('cards.text3')} 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Card 
    sx={{
      maxWidth: 420,
      width: '100%',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        '& .card-media': {
          opacity: 0.8, // Darken the image
        },
      },
    }}
    onClick={() => { 
      navigate('/descargar');
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
            Excel
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('cards.text4')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>



      <Card
        sx={{
      maxWidth: 420,
      width: '100%',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        '& .card-media': {
          opacity: 0.8, // Darken the image
        },
      },
    }}
      onClick={() => {
        navigate("/juego");
      }}
    >
       <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/kiacar.png"
            alt="juego"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {t('cards.card5')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('cards.text5')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      
  </div>




  );
}

export default ActionAreaCard;