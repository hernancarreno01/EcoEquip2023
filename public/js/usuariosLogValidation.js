window.onload = function () {
  const tieneMayuscula = /[A-Z]/;
  const tieneNumero = /\d/;

  const inputEmail = document.querySelector("#email");
  inputEmail.focus();
  const form = document.querySelector(".signinForm");
  form.addEventListener("submit", (e) => {
    let errores = [];

    e.preventDefault();
    function validarEmail(email) {
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
      
    const contrasenia = form.contrasenia.value;

    if (contrasenia.length < 8) {
      form.contrasenia.classList.remove("is-valid");
      form.contrasenia.classList.add("is-invalid");
      errores.push("La contraseña debe tener al menos 8 caracteres");
    } else if (!/[A-Z]/.test(contrasenia)) {
      form.contrasenia.classList.remove("is-valid");
      form.contrasenia.classList.add("is-invalid");
      errores.push("La contraseña debe contener al menos una mayúscula");
    } else if (!/\d/.test(contrasenia)) {
      form.contrasenia.classList.remove("is-valid");
      form.contrasenia.classList.add("is-invalid");
      errores.push("La contraseña debe contener al menos un número");
    } else {
      form.contrasenia.classList.remove("is-invalid");
      form.contrasenia.classList.add("is-valid");
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
      Swal.fire({
        title: "Bienvenido a Ecoequip",
        text: "Te has logueado de forma exitosa!",
        icon: "success",
        timer: 2500, // Tiempo en milisegundos (en este caso, 3 segundos)
        timerProgressBar: true,
        showConfirmButton: false, // Oculta el botón de confirmación
      }).then(() => {
        form.submit();
      });
    }
    const captEmail = document.getElementById("email");

    const captContrasenia = document.getElementById("contrasenia");
  });
};
