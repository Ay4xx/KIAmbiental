import { useNavigate } from 'react-router-dom';
import './Perfil.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

import React, { useState, useEffect } from 'react';

import { jwtDecode } from 'jwt-decode';

function Perfil() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [perfil, setPerfil] = useState({
    username: '',
    id_employees: '',
    type_user: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Obtén el token del usuario
        if (!token) {
          console.error('Token no encontrado en localStorage');
          return;
        }

        // Decodifica el token para obtener el ID del usuario
        const decodedToken = jwtDecode(token);
        console.log("Token decodificado:", decodedToken);
        const userId = decodedToken.id; // Extrae el ID del usuario del token

        const res = await fetch(`http://localhost:3001/api/usuarios/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }
        const data = await res.json();
        setPerfil({
          username: data.username,
          id_employees: data.id_employees,
          type_user: data.type_user,
        });
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="Perfil" id="perfil" style={{ overflowX: 'hidden' }}>
      <header
        className="header"
        id="header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
        }}
      >
        <div id="header-title" onClick={() => navigate('/home')}>
          <img
            className="KIAphoto"
            id="KIAphoto"
            src="./new-kia-logo-white.png"
            alt="Logo KIA"
          />
          <h1>mbiental</h1>
        </div>
        <div
          id="h2-group"
          style={{ marginRight: 24, display: 'flex', gap: '32px' }}
        >
          <h2
            style={{
              position: 'relative',
              top: 6,
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 500,
              fontFamily: 'Formula1-Regular',
            }}
            onClick={() => navigate('/perfil')}
          >
            Perfil
          </h2>
          <LanguageSelector
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          />
        </div>
      </header>
      {/* Contenido principal con fondo suave */}
      <div
        id="card-holder"
        style={{
          backgroundColor: '#eaeaea',
          padding: '40px 20px',
          minHeight: 'calc(100vh - 100px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            width: '100%',
            boxShadow: 6,
            borderRadius: 3,
            backgroundColor: '#fff',
          }}
        >
          <CardHeader
            title={
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {perfil.username}
              </Typography>
            }
            sx={{ backgroundColor: '#05141f', color: '#fff', py: 2 }}
          />
          <CardContent sx={{ p: 3 }}>
            <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
              <strong>{t('profile.id')}:</strong> {perfil.id_employees}
            </Typography>
            <Typography variant="body1" color="text.primary">
              <strong>{t('profile.user')}:</strong> {perfil.type_user}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Perfil;