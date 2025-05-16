import { useNavigate } from 'react-router-dom';
import './Perfil.css';

function Perfil() {
    const navigate = useNavigate();


    return (
    <div className="Perfil" id="perfil">
    <header className='header' id="header">
        <div id="header-title" onClick={() => navigate('/home')}>
        <img className="KIAphoto" id="KIAphoto" src="./new-kia-logo-white.png"></img>
        <h1>mbiental</h1>
        </div>
        <div id="h2-group">
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