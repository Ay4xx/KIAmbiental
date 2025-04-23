document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario
  
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
  
    // Validación básica
    if (nombre.trim() === "" || correo.trim() === "" || contrasena.trim() === "") {
      mostrarMensaje("Por favor, completa todos los campos", "red");
      return;
    }
  
    // Simulamos el registro
    console.log("Usuario registrado:");
    console.log("Nombre:", nombre);
    console.log("Correo:", correo);
    console.log("Contraseña:", contrasena);
  
    mostrarMensaje("¡Registro exitoso!", "green");
  
    // Limpiar campos
    document.getElementById("registroForm").reset();
  });
  
  function mostrarMensaje(mensaje, color) {
    const mensajeDiv = document.getElementById("mensaje");
    mensajeDiv.textContent = mensaje;
    mensajeDiv.style.color = color;

    
  }
  