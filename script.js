let button = document.getElementById('ButtonSoliciteToken')
let baselist = document.getElementById('ButtonSoliciteBaseList')
let selectDataBase = document.getElementById('BaseList')
let registerList = document.getElementById('registerList')
var token = null

let AccessToken = async() => {
    const grant = 'grant_type=password'
    const client = 3
    let userName = document.getElementById('UserName').value
    let password = document.getElementById('Password').value
    let accessToken = document.getElementById('txtTokenReturn')

    const retorno = await fetch(`https://autenticador.secullum.com.br/Token?${grant}&username=${userName}&password=${password}&client_id=${client}`, { method: "POST" }).then((response) => response.json())

    token = `${retorno.access_token}`
    accessToken.value = token
}

let BaseList = async() => {
    var url = `https://autenticador.secullum.com.br/ContasSecullumExterno/ListarBancos`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.onreadystatechange = () => {
        let select = document.getElementById('BaseList')
        if (xhr.readyState === 4) {
            let teste = JSON.parse(xhr.responseText)
            let aux = teste.map(list => {
                const newList = {
                    id: list.id,
                    nome: list.nome,
                    identificador: list.identificador
                }
                return newList;
            })
            for (let i = 0; i < aux.length; i++) {
                let opts = document.createElement('option')
                opts.value = aux[i].identificador
                opts.text = aux[i].nome
                select.add(opts)
            }
        }
    };

    xhr.send();
}

let ReqLiberated = () => {
    let databaseID = document.getElementById('BaseList').value
    let newDataBaseId = databaseID.replaceAll("-", '')

    var url = `https://autenticador.secullum.com.br/ContasSecullumExterno/`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader('secullumbancoselecionado', `${newDataBaseId}`)

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            console.log('Banco selecionado com sucesso')
        }
    }
    xhr.send();
}

let AllRegisterFiltered = async() => {
    let firstDate = document.getElementById('firstDate').value
    let lastDate = document.getElementById('lastDate').value
    let table = document.createElement('table')
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody')

    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById('body').appendChild(table)

    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Data";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Entrada 1";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Saída 1";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "Entrada 2";
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "Saída 2";
    let heading_6 = document.createElement('th');
    heading_6.innerHTML = "Entrada 3";
    let heading_7 = document.createElement('th');
    heading_7.innerHTML = "Saída 3";
    let heading_8 = document.createElement('th');
    heading_8.innerHTML = "Entrada 4";
    let heading_9 = document.createElement('th');
    heading_9.innerHTML = "Saída 4";
    let heading_10 = document.createElement('th');
    heading_10.innerHTML = "Entrada 5";
    let heading_11 = document.createElement('th');
    heading_11.innerHTML = "Saída 5";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    row_1.appendChild(heading_7);
    row_1.appendChild(heading_8);
    row_1.appendChild(heading_9);
    row_1.appendChild(heading_10);
    row_1.appendChild(heading_11);
    thead.appendChild(row_1);


    let url = `https://pontowebintegracaoexterna.secullum.com.br/IntegracaoExterna/Batidas?dataInicio=${firstDate}&dataFim=${lastDate}`

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            let teste = JSON.parse(xhr.responseText)
            let aux = teste.map(list => {
                const newList = {
                    data: list.Data,
                    entrada1: list.Entrada1,
                    saida1: list.Saida1,
                    entrada2: list.Entrada2,
                    saida2: list.Saida2,
                    entrada3: list.Entrada3,
                    saida3: list.Saida3,
                    entrada4: list.Entrada4,
                    saida4: list.Saida4,
                    entrada5: list.Entrada5,
                    saida5: list.Saida5,
                    nfolha: list.Funcionario.NumeroFolha
                }
                return newList;
            })
        }
    }
    xhr.send();
}



button.addEventListener('click', AccessToken)
baselist.addEventListener('click', BaseList)
registerList.addEventListener('click', AllRegisterFiltered)
selectDataBase.addEventListener('change', ReqLiberated)