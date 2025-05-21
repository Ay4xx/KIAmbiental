import { useNavigate } from 'react-router-dom';

function Navigation() {

    const navigate = useNavigate();

return (
  <div>
        <header className='header' id="header"
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                width: '100%',
            }}>
                <div id="header-title" onClick={() => navigate('/home')}>
                <img className="KIAphoto" id="KIAphoto" src="./new-kia-logo-white.png" alt="KIA logo"></img>
                <h1>mbiental</h1>
                </div>
                <div id="h2-group"
                style={{marginRight: 24, display: 'flex', gap: '32px'}}>
                <h2 onClick={() => navigate('/perfil')}>Perfil</h2>
                <h2>Opciones</h2>
                <h2>Lenguaje</h2>
                </div>
            </header>
 </div>
)}

export default Navigation;