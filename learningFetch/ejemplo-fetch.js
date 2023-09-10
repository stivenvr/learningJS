// se obtienen los elementos del DOM
const userList = document.getElementById('user-list');
const buttonGet = document.getElementById('button-get');
const buttonPost = document.getElementById('button-post');
const userName = document.getElementById('name');

// Variable global de los usuarios
let users = [];


getData();

// Funcione para mostrar objetos en pantalla
function renderData(){
  const renderUsers = users.map( user => `<li>${user.nombre}</li>` ).join("")
  userList.innerHTML = renderUsers;
}

// Funcion para llamar los datos
function getData(){
  fetch('https://bootcamp-dia-3.camilomontoyau.vercel.app/usuarios')
    .then( res => res.json())
    .then( response => {
      users = response;
      renderData();
    })
}

// Funcion para enviar datos 
function postData(){
  const data = { nombre: userName.value };
  userName.value = '';
  fetch('https://bootcamp-dia-3.camilomontoyau.vercel.app/usuarios', {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      console.log("Success:", response);
      getData();
    });
  }

buttonGet.onclick = getData;
buttonPost.onclick = postData;