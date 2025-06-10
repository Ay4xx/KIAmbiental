import React, { useEffect } from 'react'
import { useUnityContext, Unity } from 'react-unity-webgl'
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button"; // si ya usas MUI

export default function UnityPlayer() {

  const navigate = useNavigate();

  // ajusta aquí los nombres exactos de tus ficheros en public/unity/
  const { unityProvider} = useUnityContext({
    loaderUrl:    process.env.PUBLIC_URL + '/unity/KIAmbiental3.0.loader.js',
    dataUrl:      process.env.PUBLIC_URL + '/unity/KIAmbiental3.0.data',
    frameworkUrl: process.env.PUBLIC_URL + '/unity/KIAmbiental3.0.framework.js',
    codeUrl:      process.env.PUBLIC_URL + '/unity/KIAmbiental3.0.wasm',
  });



  const handleBack =  () => {

    window.location.href = "/home";
  };

  return (
    <div className="unity-page">
      <Button
        variant="contained"
        onClick={handleBack}
        sx={{ position: "absolute", top: 16, left: 16, zIndex: 10 }}
      >
        ← Volver a Home
      </Button>

    <div className='unityWrapper'>
        <Unity
          unityProvider={unityProvider} 
          style={{ 
                   width: "100%",
                    height: "480px",
                    border: "2px solid black",
                    background: "grey",
                    margin: "0 auto",
                    marginTop: "10px",
                    display: "block",     
                    
      }}
          
        />
    </div>
        </div>


  )
}
