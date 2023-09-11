// se obtienen los elementos del DOM
const userList = document.getElementById('user-list');
const buttonGet = document.getElementById('button-get');
const buttonPost = document.getElementById('button-post');
// const buttonDelete = document.getElementById('button-delete');
const userName = document.getElementById('name');

// Variable global de los usuarios
let deleteButtons = null;
let editButtons = null;
let users = [];


getData();

// Funcione para mostrar objetos en pantalla
function renderData(){
  // <td>${user.apellido ? user.nombre : 'vacio'}</td>
  // <td>${user.city ? user.nombre : 'vacio'}</td>
  const renderUsers = users.map( (user, index) => `<tr>
  <td>${user.nombre ? user.nombre : 'vacio'}</td>
  <td><button class='delete' data-index=${index}>Delete</button> <button class='edit' data-index=${index}>Edit</button></td>
  </tr>` ).join("")
  userList.innerHTML = renderUsers;
  deleteButtons = document.getElementsByClassName('delete');
  editButtons = document.getElementsByClassName('edit');
  Array.from(deleteButtons).forEach(element => {
    element.onclick = deleteData;
  });
  Array.from(editButtons).forEach(element => {
    element.onclick = getUser;
  });
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

function deleteData(e){
  e.preventDefault();
  console.log('eliminando', e)
  fetch(`https://bootcamp-dia-3.camilomontoyau.vercel.app/usuarios/${e.target.dataset.index}`, {
    method: "DELETE", 
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      console.log("Success:", response);
      getData();
    });
}

function getUser(e){
  e.preventDefault();
  const user = users[e.target.dataset.index];
  console.log(user);
}

buttonGet.onclick = getData;
buttonPost.onclick = postData;