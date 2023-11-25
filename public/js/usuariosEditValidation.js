window.onload = function () {
  let nombreUsuario = document.querySelector(".userEditTitle");
  let formulario = document.querySelector("#formulario");
  let article = document.querySelector(".article");
  const tieneMayuscula = /[A-Z]/;
  const tieneNumero = /\d/;


  const inputNombreUsuario = document.querySelector("#userName");
  inputNombreUsuario.focus();
  const form = document.querySelector(".signinForm");
  form.addEventListener("submit", (e) => {
    let errores = [];

    e.preventDefault();
    if (form.userName.value == "") {
      form.userName.classList.remove("is-valid");
      form.userName.classList.add("is-invalid");
      errores.push("El campo nombre de usuario es obligatorio");
    } else if (form.userName.value.length < 5) {
      form.userName.classList.remove("is-valid");
      form.userName.classList.add("is-invalid");
      errores.push(
        "El campo nombre de usuario debe tener al menos 5 caracteres"
      );
    } else {
      form.userName.classList.remove("is-invalid");
      form.userName.classList.add("is-valid");
    }
    if (form.firstName.value == "") {
      form.firstName.classList.remove("is-valid");
      form.firstName.classList.add("is-invalid");
      errores.push("El campo nombre es obligatorio");
    } else if (form.firstName.value.length < 2) {
      form.firstName.classList.remove("is-valid");
      form.firstName.classList.add("is-invalid");
      errores.push("El campo nombre debe tener al menos 2 caracteres");
    } else {
      form.firstName.classList.remove("is-invalid");
      form.firstName.classList.add("is-valid");
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
    if (form.adress1.value == "") {
      form.adress1.classList.remove("is-valid");
      form.adress1.classList.add("is-invalid");
      errores.push("El campo adress es obligatorio");
    } else {
      form.adress1.classList.remove("is-invalid");
      form.adress1.classList.add("is-valid");
    }
    if (form.telefono.value == "") {
      form.telefono.classList.remove("is-valid");
      form.telefono.classList.add("is-invalid");
      errores.push("El campo telefono es obligatorio");
    } else {
      form.telefono.classList.remove("is-invalid");
      form.telefono.classList.add("is-valid");
    }
    if (form.imagen_perfil.value == "") {
      form.imagen_perfil.classList.remove("is-valid");
      form.imagen_perfil.classList.add("is-invalid");
      errores.push("Debe cargar una imagen de usuario");
    } else {
      const file = form.imagen_perfil.files[0];
      if (!/\.(jpg|jpeg|png|bmp)$/i.test(file.name)) {
        form.imagen_perfil.classList.remove("is-valid");
        form.imagen_perfil.classList.add("is-invalid");
        errores.push("El archivo debe ser de tipo jpg, jpeg, png o bmp");
      } else if (file.size > 5 * 1024 * 1024) {
        // Validar tamaño del archivo (5 MB)
        form.imagen_perfil.classList.remove("is-valid");
        form.imagen_perfil.classList.add("is-invalid");
        errores.push("El tamaño del archivo debe ser menor a 5 MB");
      } else {
        form.imagen_perfil.classList.remove("is-invalid");
        form.imagen_perfil.classList.add("is-valid");
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
    const captNombres = document.getElementById("firstName");
    const captApellido = document.getElementById("apellido");
    const captEmail = document.getElementById("email");
    const captDireccion = document.getElementById("adress");
    const captCiudad = document.getElementById("ciudad_id");
    const CaptRol = document.getElementById("rol_id");
    const captContrasenia = document.getElementById("constrasenia");
    const captTelefono = document.getElementById("telefono");
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  })
}
