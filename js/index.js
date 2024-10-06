import { io } from 'socket.io-client'


const socket = io.connect('https://expresssocketio-production-211e.up.railway.app/');
const menssageList = document.getElementById('menssageList')
const form = document.getElementById('myForm');
const inputText = document.getElementById('text')
const formCredentials = document.getElementById('credentials');
inputText.disabled = true;
let nameUser;

formCredentials.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name');
    nameUser = name.value;

    inputText.disabled = false;
    socket.emit('userRegister', nameUser);

    fixOpacity();
});

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const textConstant = document.getElementById('text');
    const text = textConstant.value;
    textConstant.value = '';
    if (text !== '') {
        socket.emit('newMessage', text)
    }

});

socket.on('respuestaServidor', (data) => {
    createPElement(data)
});

function createPElement(data) {

    const newDiv = document.createElement('div')
    newDiv.className = 'messageContainer';

    const newUser = document.createElement('span')
    data.user === nameUser ? newUser.innerText = 'Me' : newUser.innerText = data.user;
    newUser.className = 'username';
    newDiv.appendChild(newUser);

    const newMessage = document.createElement('p')
    newMessage.className = 'message';
    newMessage.innerText = data.message;

    const spanInfo = document.createElement('span')
    spanInfo.innerText = new Date().toLocaleTimeString();
    spanInfo.style.fontSize = '0.7em'

    newDiv.appendChild(newMessage);
    newDiv.appendChild(spanInfo)

    if (data.user === nameUser) {
        newDiv.style.alignSelf = 'flex-end'
        newDiv.style.backgroundColor = '#097fe7'
        newDiv.style.color = 'white'
        newUser.style.alignSelf = 'flex-end'
        newMessage.style.alignSelf = 'flex-end'
        spanInfo.style.alignSelf = 'flex-end'
    }
    menssageList.appendChild(newDiv);

    menssageList.scrollTop = menssageList.scrollHeight;
    console.log('Mensaje desde el servidor:', data);
}

function fixOpacity() {
    formCredentials.style.opacity = '0%'
    menssageList.style.opacity = '100%'
    form.style.opacity = '100%'
    menssageList.style.marginTop = '-50px'
}