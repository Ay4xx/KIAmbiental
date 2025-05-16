import { useNavigate } from "react-router-dom";
import './Perfil.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function Perfil() {
  // Puedes reemplazar estos datos por props o datos dinámicos
  const perfil = {
    nombre: "Juan Pérez",
    correo: "juan.perez@email.com",
    telefono: "+52 123 456 7890",
    direccion: "Av. Siempre Viva 123, Ciudad, País",
    foto: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  const navigate = useNavigate();

  return (

    <div className="Perfil" id="perfil">
    <header className='header' id="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
      }}>
        <div id="header-title" onClick={() => navigate('/home')}>
        <img className="KIAphoto" id="KIAphoto" src="./new-kia-logo-white.png"></img>
        <h1>mbiental</h1>
        </div>
        <div id="h2-group"
        style={{marginRight: 24, display: 'flex', gap: '32px'}}>
          <h2 onClick={() => navigate('/perfil')}>Perfil</h2>
          <h2>Opciones</h2>
          <h2>Lenguaje</h2>
        </div>
      </header>
    <div id='card-holder' style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
        <CardHeader
          avatar={
            <Avatar
              alt={perfil.nombre}
              src={perfil.foto}
              sx={{ width: 64, height: 64 }}
            />
          }
          title={
            <Typography variant="h5" component="div">
              {perfil.nombre}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            <strong>Correo:</strong> {perfil.correo}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Teléfono:</strong> {perfil.telefono}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Dirección:</strong> {perfil.direccion}
          </Typography>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}

export default Perfil;