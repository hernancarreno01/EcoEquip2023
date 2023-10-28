window.onload = function () {
  const captName = document.querySelector("#nombre");
  captName.focus();
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    let errores = [];

    e.preventDefault();
    if (form.nombre.value == "") {
      form.nombre.classList.remove("is-valid");
      form.nombre.classList.add("is-invalid");
      errores.push("Debe ingresar nombre del producto");
    } else if (form.nombre.value.length < 5) {
      form.nombre.classList.remove("is-valid");
      form.nombre.classList.add("is-invalid");
      errores.push("El nombre del producto debe tener al menos 5 caracteres");
    } else {
      form.nombre.classList.remove("is-invalid");
      form.nombre.classList.add("is-valid");
    }
    if (form.precio.value == "") {
      form.precio.classList.remove("is-valid");
      form.precio.classList.add("is-invalid");
      errores.push("No ingresó precio del producto");
    } else {
      form.precio.classList.remove("is-invalid");
      form.precio.classList.add("is-valid");
    }
    if (form.modelo.value == "") {
      form.modelo.classList.remove("is-valid");
      form.modelo.classList.add("is-invalid");
      errores.push("No ingresó modelo del producto");
    } else {
      form.modelo.classList.remove("is-invalid");
      form.modelo.classList.add("is-valid");
    }
    if (form.descripcion.value == "") {
      form.descripcion.classList.remove("is-valid");
      form.descripcion.classList.add("is-invalid");
      errores.push("No ingresó descripcion del producto");
    } else if (form.descripcion.value.length < 20) {
      form.descripcion.classList.remove("is-valid");
      form.descripcion.classList.add("is-invalid");
      errores.push("La descripción debe tener al menos 20 cáracteres");
    } else {
      form.descripcion.classList.remove("is-invalid");
      form.descripcion.classList.add("is-valid");
    }
    if (form.categorias_id.value == "") {
      form.categorias_id.classList.remove("is-valid");
      form.categorias_id.classList.add("is-invalid");
      errores.push("Debe selecionar una categoría para el producto");
    } else {
      form.categorias_id.classList.remove("is-invalid");
      form.categorias_id.classList.add("is-valid");
    }
    if (!allowedExtensions.exec(imagen_01.value)) {
      form.imagen_01.classList.remove("is-valid");
      form.imagen_01.classList.add("is-invalid");
      errores.push(
        "El archivo de imagen debe tener una extensión válida (JPG, JPEG, PNG o GIF)"
      );
    } else {
      form.imagen_01.classList.remove("is-invalid");
      form.imagen_01.classList.add("is-valid");
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
        'Has creado un producto nuevo',
        'success'
      ).then(()=> {form.submit();})
    }
  });
  const captprecio = document.getElementById("precio");
  const captModelo = document.getElementById("modelo");
  const captDescrip = document.getElementById("descripcion");
  const captCategorias = document.getElementById("categorias_id");
  const captImagen_01 = document.getElementById("imagen_01");
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
};
