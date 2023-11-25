window.onload = function () {
  let nombreUsuario = document.querySelector(".userRegisterTitle");
  let formulario = document.querySelector("#formulario");
  let article = document.querySelector(".article");
  const tieneMayuscula = /[A-Z]/;
  const tieneNumero = /\d/;


  const inputNombreUsuario = document.querySelector("#nombre_usuario");
  inputNombreUsuario.focus();
  const form = document.querySelector(".signinForm");
  form.addEventListener("submit", (e) => {
    let errores = [];

    e.preventDefault();
    if (form.nombre_usuario.value == "") {
      form.nombre_usuario.classList.remove("is-valid");
      form.nombre_usuario.classList.add("is-invalid");
      errores.push("El campo nombre de usuario es obligatorio");
    } else if (form.nombre_usuario.value.length < 5) {
      form.nombre_usuario.classList.remove("is-valid");
      form.nombre_usuario.classList.add("is-invalid");
      errores.push(
        "El campo nombre de usuario debe tener al menos 5 caracteres"
      );
    } else {
      form.nombre_usuario.classList.remove("is-invalid");
      form.nombre_usuario.classList.add("is-valid");
    }
    if (form.nombres.value == "") {
      form.nombres.classList.remove("is-valid");
      form.nombres.classList.add("is-invalid");
      errores.push("El campo nombre es obligatorio");
    } else if (form.nombres.value.length < 2) {
      form.nombres.classList.remove("is-valid");
      form.nombres.classList.add("is-invalid");
      errores.push("El campo nombre debe tener al menos 2 caracteres");
    } else {
      form.nombres.classList.remove("is-invalid");
      form.nombres.classList.add("is-valid");
    }
    if (form.apellido.value == "") {
      form.apellido.classList.remove("is-valid");
      form.apellido.classList.add("is-invalid");
      errores.push("El campo apellido es obligatorio");
    } else if (form.apellido.value.length < 1) {
      form.apellido.classList.remove("is-valid");
      form.apellido.classList.add("is-invalid");
      errores.push("El campo apellido debe tener al menos 1 caracter");
    } else {
      form.apellido.classList.remove("is-invalid");
      form.apellido.classList.add("is-valid");
    }
    function validarEmail(email) {
      // validar correo electrónico
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
    if (form.email.value == "") {
      form.email.classList.remove("is-valid");
      form.email.classList.add("is-invalid");
      errores.push("El campo correo electrónico es obligatorio");
    } else if (form.email.value.length < 5) {
      form.email.classList.remove("is-valid");
      form.email.classList.add("is-invalid");
      errores.push("El campo correo electrónico no es válido");
    } else if (!validarEmail(form.email.value)) {
      form.email.classList.remove("is-valid");
      form.email.classList.add("is-invalid");
      errores.push("El campo correo electrónico no es válido");
    } else {
      form.email.classList.remove("is-invalid");
      form.email.classList.add("is-valid");
    }
    if (form.direccion.value == "") {
      form.direccion.classList.remove("is-valid");
      form.direccion.classList.add("is-invalid");
      errores.push("El campo direccion es obligatorio");
    } else {
      form.direccion.classList.remove("is-invalid");
      form.direccion.classList.add("is-valid");
    }
    if (form.contrasenia.value == "") {
      form.contrasenia.classList.remove("is-valid");
      form.contrasenia.classList.add("is-invalid");
      errores.push("La contraseña es obligatoria");
    } else if (form.contrasenia.value.length < 8) {
      form.contrasenia.classList.remove("is-valid");
      form.contrasenia.classList.add("is-invalid");
      errores.push("La contraseña debe tener al menos 8 caracteres");
    } else if (
      !tieneMayuscula.test(form.contrasenia.value) ||
      !tieneNumero.test(form.contrasenia.value)
    ) {
      form.contrasenia.classList.remove("is-valid");
      form.contrasenia.classList.add("is-invalid");
      errores.push(
        "La contraseña debe contener al menos una letra mayúscula y un número"
      );
    } else {
      form.contrasenia.classList.remove("is-invalid");
      form.contrasenia.classList.add("is-valid");
    }
    if (form.telefono.value == "") {
      form.telefono.classList.remove("is-valid");
      form.telefono.classList.add("is-invalid");
      errores.push("El campo telefono es obligatorio");
    } else {
      form.telefono.classList.remove("is-invalid");
      form.telefono.classList.add("is-valid");
    }
    if (form.avatar.value == "") {
      form.avatar.classList.remove("is-valid");
      form.avatar.classList.add("is-invalid");
      errores.push("Debe cargar una imagen de usuario");
    } else {
      const file = form.avatar.files[0];
      if (!/\.(jpg|jpeg|png|bmp)$/i.test(file.name)) {
        form.avatar.classList.remove("is-valid");
        form.avatar.classList.add("is-invalid");
        errores.push("El archivo debe ser de tipo jpg, jpeg, png o bmp");
      } else if (file.size > 5 * 1024 * 1024) {
        // Validar tamaño del archivo (5 MB)
        form.avatar.classList.remove("is-valid");
        form.avatar.classList.add("is-invalid");
        errores.push("El tamaño del archivo debe ser menor a 5 MB");
      } else {
        form.avatar.classList.remove("is-invalid");
        form.avatar.classList.add("is-valid");
      }
      const ul = document.querySelector(".errores");
      if (errores.length != 0) {
        ul.innerHTML = "";
        ul.classList.add("alert-warning");
        for (let i = 0; i < errores.length; i++) {
          const error = errores[i];
          ul.innerHTML += `<li> ${error} </li>`;
        }
        Swal.fire(
          {
            icon: 'error',
            title: 'Se detectaron uno o mas errores!',
            text: 'Por favor revisar el detalle de errores.'
          })
      } else {
        ul.innerHTML = '';
        Swal.fire(
          'Felicitaciones!',
          'Has creado un tu usuario correctamente',
          'success'
        ).then(() => { form.submit(); })
      }
    }
    const captNombres = document.getElementById("nombres");
    const captApellido = document.getElementById("apellido");
    const captEmail = document.getElementById("email");
    const captDireccion = document.getElementById("direccion");
    const captCiudad = document.getElementById("ciudad_id");
    const CaptRol = document.getElementById("rol_id");
    const captContrasenia = document.getElementById("constrasenia");
    const captTelefono = document.getElementById("telefono");
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  })
}
