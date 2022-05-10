let button = document.getElementById('ButtonSoliciteToken')
let baselist = document.getElementById('ButtonSoliciteBaseList')
var token = null

let AccessToken = async() => {
    const grant = 'grant_type=password'
    const client = 3
    let userName = document.getElementById('UserName').value
    let password = document.getElementById('Password').value
    let accessToken = document.getElementById('txtTokenReturn')

    const retorno = await fetch(`https://autenticador.secullum.com.br/Token?${grant}&username=${userName}&password=${password}&client_id=${client}`, { method: "POST" }).then((response) => response.json())

    token = `${retorno.access_token}`
    accessToken.innerHTML = token
}

let BaseList = async() => {
    var url = `https://autenticador.secullum.com.br/ContasSecullumExterno/ListarBancos`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            let teste = JSON.parse(xhr.responseText)
            for (let dataBases of teste) {
                console.log(`id = ${dataBases.id} ---> nome = ${dataBases.nome} ---> identificador = ${dataBases.identificador}`)
            }
        }
    };

    xhr.send();
}


button.addEventListener('click', AccessToken)
baselist.addEventListener('click', BaseList)