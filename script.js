let button = document.getElementById('ButtonSoliciteToken')
let userName = document.getElementById('UserName').value
let password = document.getElementById('Password').value
let accessToken = document.getElementById('ReturnToken')
const grant = 'grant_type=password'
const client = 3
    //var xhr = new XMLHttpRequest();

//xhr.open('POST', 'https://autenticador.secullum.com.br/Token')
//request.setRequestHeader('Content-Type', 'application/json')

let AccessToken = async() => {
    /*const data = {
        grant_type: 'password',
        username: `${userName}`,
        password: `${password}`,
        client_id: `${client}`
    };*/

    /*const retorno = await fetch(`https://autenticador.secullum.com.br/Token?${grant}&username=${userName}&password=${password}&client_id=${client}`, {
        method: "POST",
    }).then((response) => response.json())

    accessToken.innerHTML.value = `${retorno.access_token}`*/
    console.log(`${userName} e a senha é: ${password}`)
}

button.addEventListener('click', AccessToken)