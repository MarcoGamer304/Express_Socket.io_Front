import { io } from 'socket.io-client'
import { getUsername } from './credential';

const socket = io.connect('https://expresssocketio-production-1926.up.railway.app/');
const menssageList = document.getElementById('menssageList')
const form = document.getElementById('myForm');

const nameUser = getUsername();
socket.emit('userRegister', nameUser);

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

    if(data.user === nameUser){
        newDiv.style.alignSelf = 'flex-end'
        newDiv.style.backgroundColor = '#097fe7'
        newDiv.style.color = 'white'
        newUser.style.alignSelf= 'flex-end'
        newMessage.style.alignSelf = 'flex-end'
        spanInfo.style.alignSelf = 'flex-end'
    }
    menssageList.appendChild(newDiv);

    menssageList.scrollTop = menssageList.scrollHeight;
    console.log('Mensaje desde el servidor:', data);
}