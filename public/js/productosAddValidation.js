window.onload = function () {
  const captName = document.querySelector("#nombre");
    captName.focus();
    const form = document.querySelector('.form');
    form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.nombre.value == '') {
        form.nombre.classList.add('is-invalid');
    }
    
    })

 


  const captprecio = document.getElementById("precio");
  const captModelo = document.getElementById("modelo");
  const captDescrip = document.getElementById("descripcion");
  const captCategorias = document.getElementById("categorias_id");
  const captImagen_01 = document.getElementById("imagen_01");

}
