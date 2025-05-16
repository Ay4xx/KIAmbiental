import { useNavigate } from 'react-router-dom';
import './Perfil.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function Perfil() {
    const navigate = useNavigate();


    const perfil = {
        nombre: "Juan Pérez",
        foto: "https://randomuser.me/api/portraits/men/1.jpg",
        correo: "juan.perez@email.com",
        telefono: "555-1234",
        direccion: "Calle Falsa 123, Ciudad"
    };


    return (
    <div className="Perfil" id="perfil"
    style={{overflowX: 'hidden'}}>
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
    <div id='card-holder' style={{ display: 'flex', justifyContent: 'center', marginTop: 40, marginBottom: 40 }}>
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