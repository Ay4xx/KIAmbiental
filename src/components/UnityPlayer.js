import React from 'react'
import { useUnityContext, Unity } from 'react-unity-webgl'

export default function UnityPlayer() {
  // ajusta aquí los nombres exactos de tus ficheros en public/unity/
  const { unityProvider } = useUnityContext({
    loaderUrl:    process.env.PUBLIC_URL + '/unity/KIAmbiental3.0.loader.js',
    dataUrl:      process.env.PUBLIC_URL + '/unity/KIAmbiental3.0.data',
    frameworkUrl: process.env.PUBLIC_URL + '/unity/KIAmbiental3.0.framework.js',
    codeUrl:      process.env.PUBLIC_URL + '/unity/KIAmbiental3.0.wasm',
  })

  return (
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
  )
}
