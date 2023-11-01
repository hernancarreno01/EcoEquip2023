window.onload = function () {
  const captName = document.querySelector("#nombre_usuario");
  captName.focus();
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    let errores = [];

    e.preventDefault();
    if (form.nombre_usuario.value == "") {
      form.nombre_usuario.classList.remove("is-valid");
      form.nombre_usuario.classList.add("is-invalid");
      errores.push("Debe ingresar un nombre de usuario");
    } else if (form.nombre_usuario.value.length < 5) {
      form.nombre_usuario.classList.remove("is-valid");
      form.nombre_usuario.classList.add("is-invalid");
      errores.push("El nombre de usuario debe tener al menos 2 caracteres");
    } else {
      form.nombre_usuario.classList.remove("is-invalid");
      form.nombre_usuario.classList.add("is-valid");
    }
    if (form.nombres.value == "") {
      form.nombres.classList.remove("is-valid");
      form.nombres.classList.add("is-invalid");
      errores.push("Por favor ingrese su nombre");
    } else {
      form.nombres.classList.remove("is-invalid");
      form.nombres.classList.add("is-valid");
    }
    if (form.apellido.value == "") {
      form.apellido.classList.remove("is-valid");
      form.apellido.classList.add("is-invalid");
      errores.push("Por favor ingrese su apellido");
    } else {
      form.apellido.classList.remove("is-invalid");
      form.apellido.classList.add("is-valid");
    }
    if (form.email.value == "") {
        form.email.classList.remove("is-valid");
        form.email.classList.add("is-invalid");
        errores.push("Debe ingresar una dirección de correo electrónico");
      } else {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(form.email.value)) {
          form.email.classList.remove("is-valid");
          form.email.classList.add("is-invalid");
          errores.push("El correo electrónico no es válido");
        } else {
          form.email.classList.remove("is-invalid");
          form.email.classList.add("is-valid");
        }
      }
      
    if (form.direccion.value == "") {
      form.direccion.classList.remove("is-valid");
      form.direccion.classList.add("is-invalid");
      errores.push("Por favor su dirección para poder recibir los envios");
    } else {
      form.direccion.classList.remove("is-invalid");
      form.direccion.classList.add("is-valid");
    }
    if (form.ciudad_id.value == "") {
        form.ciudad_id.classList.remove("is-valid");
        form.ciudad_id.classList.add("is-invalid");
        errores.push("Debe selecionar una ciudad");
      } else {
        form.ciudad_id.classList.remove("is-invalid");
        form.ciudad_id.classList.add("is-valid");
      }
      if (form.rol_id.value == "") {
        form.rol_id.classList.remove("is-valid");
        form.rol_id.classList.add("is-invalid");
        errores.push("Debe selecionar su rol dentro de EcoEquip");
      } else {
        form.rol_id.classList.remove("is-invalid");
        form.rol_id.classList.add("is-valid");
      }
      if (form.contrasenia.value == "") {
        form.contrasenia.classList.remove("is-valid");
        form.contrasenia.classList.add("is-invalid");
        errores.push("Debe ingresar una contraseña");
      } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(form.contrasenia.value)) {
          form.contrasenia.classList.remove("is-valid");
          form.contrasenia.classList.add("is-invalid");
          errores.push("La contraseña debe tener al menos 8 caracteres y contener letras mayúsculas, minúsculas, un número y un carácter especial (@, $, !, %, *, ?, &)");
        } else {
          form.contrasenia.classList.remove("is-invalid");
          form.contrasenia.classList.add("is-valid");
        }
      }
      if (form.telefono.value == "") {
        form.telefono.classList.remove("is-valid");
        form.telefono.classList.add("is-invalid");
        errores.push("Debe ingresar un número de teléfono");
      } else {
        // validar un número de teléfono con código de país
        const telefonoRegex = /^\+\d{1,3}-\d{1,4}-\d{8}$/;
      
        if (!telefonoRegex.test(form.telefono.value)) {
          form.telefono.classList.remove("is-valid");
          form.telefono.classList.add("is-invalid");
          errores.push("El número de teléfono no es válido. Debe seguir el formato: +XX-XXXX-XXXXXXXX");
        } else {
          form.telefono.classList.remove("is-invalid");
          form.telefono.classList.add("is-valid");
        }
      }
    if (!allowedExtensions.exec(avatar.value)) {
      form.avatar.classList.remove("is-valid");
      form.avatar.classList.add("is-invalid");
      errores.push(
        "El archivo de imagen debe tener una extensión válida (JPG, JPEG, PNG o GIF)"
      );
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
      Swal.fire({
        icon: "error",
        title: "Se detectaron uno o mas errores!",
        text: "Por favor revisar el detalle de errores.",
      });
    } else {
      ul.innerHTML = "";
      Swal.fire(
        "Felicitaciones!",
        "Has completado con exito la registración!",
        "success"
      ).then(() => {
        form.submit();
      });
    }
  });
  const captNombres = document.getElementById("nombres");
  const captApellido = document.getElementById("apellido");
  const captEmail = document.getElementById("email");
  const captDireccion = document.getElementById("direccion");
  const captCiudad_id = document.getElementById("ciudad_id");
  const captRol_id = document.getElementById("rol_id");
  const captContrasenia = document.getElementById("contrasenia");
  const captTelefono = document.getElementById("telefono");
  const captAvatar = document.getElementById("avatar");
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
};
