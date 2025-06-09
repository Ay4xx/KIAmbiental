import React from 'react'
import { useUnityContext, Unity } from 'react-unity-webgl'

export default function UnityPlayer() {
  // ajusta aquí los nombres exactos de tus ficheros en public/unity/
  const { unityProvider, loadingProgression } = useUnityContext({
    loaderUrl:    process.env.PUBLIC_URL + '/unity/KIAmbientalGamificacion.loader.js',
    dataUrl:      process.env.PUBLIC_URL + '/unity/KIAmbientalGamificacion.data',
    frameworkUrl: process.env.PUBLIC_URL + '/unity/KIAmbientalGamificacion.framework.js',
    codeUrl:      process.env.PUBLIC_URL + '/unity/KIAmbientalGamificacion.wasm',
  })

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <p>Cargando juego… {Math.round(loadingProgression * 100)}%</p>
      <div style={{ 
        width: '800px', height: '600px', margin: 'auto', 
        border: '2px solid #000', background: '#444' 
      }}>
        <Unity unityProvider={unityProvider} />
      </div>
    </div>
  )
}
