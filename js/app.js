var pasteles = [
  {
    id: 1,
    nombre: "Frutos Rojos",
    img: "img/beerys.jpg",
    detalle:
      "Pan de vainilla  humedecido con tres leches, queso crema philadelphia y relleno de mermelada de frutos rojos.",
    precio: 370,
  },
  {
    id: 2,
    nombre: "Chocolate",
    img: "img/dueto.jpg",
    detalle:
      "Pan de chocolate, relleno de delicioso queso crema con nuez y mermelada. Con riquísimas fresas organicas. ",
    precio: 530,
  },
  {
    id: 3,
    nombre: "Frutas Selectas",
    img: "img/bisc.jpg",
    detalle:
      "Delicioso pan de vainilla con chantilly de queso crema, decorada con fresas y delicioso mango.",
    precio: 510,
  },
  {
    id: 4,
    nombre: "Pingüino",
    img: "img/pinguino.jpg",
    detalle:
      "Rico pan de chocolate cubierto de chocolate, decorado con chispas, cajeta, trozos de  chocolate.",
    precio: 390,
  },
  {
    id: 5,
    nombre: "Brownie",
    img: "img/chocobrownie_cuadro.webp",
    detalle:
      "Delicioso pan de chocolate, cubierto de chantilly con finos pedazos de brownie y chocolate. ",
    precio: 450,
  },
  {
    id: 6,
    nombre: "Milky Way",
    img: "img/milki.jpg",
    detalle:
      "Pan de chocolate cubierto con queso crema, envuelto y decorado con chocolate milky way.",
    precio: 420,
  },
  {
    id: 7,
    nombre: "M&Ms",
    img: "img/pastel__mms.jpg",
    detalle:
      "Mágico pastel con pan de vainilla, cubierto de betún chantilly sabor chocolate relleno de chocolates M&Ms.",
    precio: 610,
  },
  {
    id: 9,
    nombre: "Oreo",
    img: "img/cookies.jpg",
    detalle:
      "Pan de vainilla con galleta oreo, relleno y cubierto trocitos de oreo,  y decorado con galletas.",
    precio: 380,
  },
  {
    id: 10,
    nombre: "Beso de Coco",
    img: "img/coco.jpg",
    detalle:
      "Pan de vainilla sabor a coco. Relleno con cremoso queso y coco natural rallado, decorado con Raffaello Ferrero Rocher.",
    precio: 510,
  },
  {
    id: 11,
    nombre: "Pistache",
    img: "img/pistache.jpg",
    detalle: "Pan de pistache con delicioso pistache. Decorado con chatilly.",
    precio: 630,
  },
  {
    id: 12,
    nombre: "Vainilla",
    img: "img/vainilla.jpg",
    detalle:
      "Exquisita rosca de pan sabor vainilla, cubierta con betún de mantequilla con chocolate y decorada con trocitos de nuez.",
    precio: 420,
  },
  {
    id: 13,
    nombre: "Mango",
    img: "img/mango.jpg",
    detalle:
      "Deliciosa rosca elaborada en pan de vainilla con nuestra combinación especial de zanahoria, nuez y canela.",
    precio: 450,
  },
  {
    id: 14,
    nombre: "Zanahoria",
    img: "img/zanahoriaa.jpg",
    detalle:
      "Tres capas de pan de pistache con trocitos de pistache. Decorado con betún de queso crema.",
    precio: 530,
  },
  {
    id: 15,
    nombre: "Limón",
    img: "img/limonchelo.jpg",
    detalle:
      "Pan de vainilla en tres capas, humedecido con jarabe de limón y en cada capa delicioso pudin de limón. ",
    precio: 485,
  },
];
var contenedorPasteles = document.getElementById("contenedor-pasteles");
let contador = 0;

pasteles.forEach(function (pastel) {
  var cardHTML = `
  <div class="card">
      <img src="${pastel.img}" class="imagen-curso u-full-width">
      <div class="info-card">
        <h4>${pastel.nombre}</h4>
        <div class="detalle-card">
          <p>${pastel.detalle}</p>
        </div>
        <img src="img/estrellas.png">
        <p class="precio"><span class="u-pull-right">${pastel.precio}</span></p>
        <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${pastel.id}">Agregar Al Carrito</a>
      </div>
    </div>
  `;
  contenedorPasteles.innerHTML += cardHTML;
});

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaPasteles = document.querySelector("#lista-pasteles");
const total = document.querySelector(".total");
 let precioTotal = 0; 
let articulosCarrito = [];
let pastelBorrar = [];



cargarEventListener();
function cargarEventListener() {
  //Cuando agrega un pastel al carrito
  listaPasteles.addEventListener("click", agregarCarrito);
  //Eliminar un pastel del carrito
  carrito.addEventListener("click", eliminarCarrito);
}

function agregarCarrito(e) {
  
  if (e.target.classList.contains("agregar-carrito")) {
    //Para que solo se agregue cuando presionamos el boton Agregar Carrito
    const pastelAgregarCarrito = e.target.parentElement.parentElement;
    console.log(pastelAgregarCarrito);
    e.preventDefault();
    obtenerDatos(pastelAgregarCarrito);
    contador++;
    actualizarContador();
    
  }
  calcularTotal();
}

function eliminarCarrito(e) {
  if (e.target.classList.contains("borrar-pastel")) {
    const pastelBorrarId = e.target.getAttribute("data-id"); //Obteniendo el Id del Pastel a Borrar del carrito
    //Actualizar el contador del circulo rojo al eliminar uno o mas pasteles
     pastelBorrar = articulosCarrito.filter(
      (pastel) => pastel.id == pastelBorrarId
    );
    console.log(pastelBorrar, "Pastel Borrado");
    actualizarTotal();
    pastelBorrar.forEach((pastelCantidad) => {
      contador = contador - pastelCantidad.cantidad;
    });
    actualizarContador();

    articulosCarrito = articulosCarrito.filter(
      (pasteles) => pasteles.id != pastelBorrarId
    );
    console.log(articulosCarrito, "Articulos que se encuentran en el carrito");

    carritoHtml();
  }
}
//Lee el contenido HTML al que le dimos click y extraer la informacion
function obtenerDatos(pastel) {
  //Crear un objeto con el contenido del pastel seleccionado
  const pastelAgregarCarrito = {
    imagen: pastel.querySelector("img").src,
    nombre: pastel.querySelector("h4").textContent,
    precio: pastel.querySelector("span").textContent,
    id: pastel.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //console.log(pastelAgregarCarrito);

  //Revisa si un elemnto ya existe en el carrito
  const pastelExiste = articulosCarrito.find(
    (pastelExiste) => pastelExiste.id === pastelAgregarCarrito.id
  );

  if (pastelExiste) {
    //Si el pastel existe, vamos a iterar sobre los pasteles volvemos a comparar y aumentamos en uno la cantidad
    const pasteles = articulosCarrito.map((pastel) => {
      if (pastel.id === pastelAgregarCarrito.id) {
        pastel.cantidad++;
        return pastel;
        //console.log(pastel.cantidad)
      } else {
        return pastel;
      }
    });
    articulosCarrito = [...pasteles];
  } else {
    //Si no existe simplemente se agrega al carrito
    //Agregar el pastel selccionado al carrito
    articulosCarrito = [...articulosCarrito, pastelAgregarCarrito];
    //console.log(articulosCarrito);
  }

  carritoHtml();
}
//Muestra el carrito de compras en el HTML
function carritoHtml() {
  //Limpiar el HTML
  limpiarHTML();

  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach((pasteles) => {
    const row = document.createElement("tr");
    const { nombre, precio, cantidad, imagen, id } = pasteles; //destructuring
    row.innerHTML =
      //Es muy importante usar el inner HTML ya que asi evitar estar creando elemento por elemento y mejor creas tu estructura html
      //si estás trabajando con pequeñas cantidades de contenido HTML y deseas un mayor control sobre la estructura y comportamiento de tus elementos, createElement es generalmente preferible. Sin embargo, si estás insertando grandes fragmentos de HTML de forma rápida y no tienes preocupaciones de seguridad o necesidades específicas de manipulación, innerHTML podría ser más conveniente.
      `<tr>
        <td><img class="imagen-carrito" src="${imagen}"></td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-pastel" data-id="${id}">X</a></td>
      </tr>`;
    //console.log(row);
    //Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

//Elimina los cursos del tbody para que no aparezcan los anterirores mas  el nuevo

function limpiarHTML() {
  //Forma Lenta
  //contenedorCarrito.innerHTML = '';

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
function actualizarContador() {
  const contadorElemento = document.getElementById("notificacion-carrito");
  contadorElemento.textContent = contador;
}

function calcularTotal (){
 precioTotal = 0;
  articulosCarrito.forEach(pastel => {
   
      precioTotal = precioTotal + (parseInt(pastel.precio) * pastel.cantidad);
      console.log(precioTotal)
      total.textContent = precioTotal;
      
    
  
 
  })
}
function actualizarTotal (){
  pastelBorrar.forEach(pastelBorrado => {
    precioTotal = precioTotal - (parseInt (pastelBorrado.precio)* pastelBorrado.cantidad);
    console.log(precioTotal);
    total.textContent = precioTotal;
   
  })
  console.log(pastelBorrar)
}
vaciarCarritoBtn.addEventListener("click", () => {
  articulosCarrito.splice(0, articulosCarrito.length);
  precioTotal = precioTotal-precioTotal;
  console.log(precioTotal)
  total.textContent = precioTotal;
 limpiarHTML();
 contador = 0;
  actualizarContador();
});