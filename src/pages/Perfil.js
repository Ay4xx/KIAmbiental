import { useNavigate } from 'react-router-dom';
import './Perfil.css';

function Perfil() {
    const navigate = useNavigate();


    return (
    <div className="Perfil" id="perfil">
        <header className='header' id="header">
            <div id="header-title" onClick={navigate('/home')}>
                <img className="KIAphoto" id="KIAphoto" src="./new-kia-logo-white.png"></img>
                <h1>mbiental</h1>
            </div>
            <div id="h2-group">
                <h2>Perfil</h2>
                <h2>Opciones</h2>
                <h2>Lenguaje</h2>
            </div>
        </header>

        {/* Aquí puedes agregar el contenido de la página de perfil */}
        <h1>Perfil</h1>
        {/* Agrega más detalles del perfil aquí */}

    </div>

    );
}

export default Perfil;