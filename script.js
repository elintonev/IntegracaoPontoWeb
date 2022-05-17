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
    let tabela = document.getElementById('tableList')
	let fileName = document.getElementById('FileName').value

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
            }).filter( testeFilter => {
				return testeFilter.entrada1 !== null || testeFilter.entrada2 !== null || testeFilter.entrada3 !== null || testeFilter.entrada4 !== null || testeFilter.entrada5 !== null || 
				testeFilter.saida1 !== null || testeFilter.saida2 !== null || testeFilter.saida3 !== null || testeFilter.saida4 !== null || testeFilter.saida5 !== null
			} )
			console.log(arq(aux))
			
			
			
			
            downloadFiles(arq(aux), `${fileName}`, 'txt')
        }
    }
    xhr.send();
}

let arq = (arquivo) =>{
	let result = ''
	for (let obj of arquivo){		
		result += `${obj.data} ---> ${obj.entrada1}  ${obj.saida1} ---> ${obj.nfolha}`
		result += `\n`
	}
	return result
}

function downloadFiles(data, file_name, file_type) {
    var file = new Blob([data], {type: file_type});
    if (window.navigator.msSaveOrOpenBlob){ 
	window.navigator.msSaveOrOpenBlob(file, file_name);}
    else { 
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = file_name;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

button.addEventListener('click', AccessToken)
baselist.addEventListener('click', BaseList)
registerList.addEventListener('click', AllRegisterFiltered)
selectDataBase.addEventListener('change', ReqLiberated)