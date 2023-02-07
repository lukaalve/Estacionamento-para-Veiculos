const LISTA_CARROS = []
const LISTA_VEICULOS = [
    {
        id: 'valorHoraMoto',
        tipo: 'moto',
        textoPergunta: 'Qual o valor hora Moto',
        textoBotao: 'Atualizar Valor Hora Moto',
    },
    {
        id: 'valorHoraCarro',
        tipo: 'carro',
        textoPergunta: 'Qual o valor hora Carro',
        textoBotao: 'Atualizar Valor Hora Carro'
    },
    {
        id: 'valorHoraCaminhao',
        tipo: 'caminhao',
        textoPergunta: 'Qual o valor hora Caminhão',
        textoBotao: 'Atualizar Valor Hora Caminhão',
    }
]

function atualizarValorHora(id) {
    localStorage.removeItem(id)
    perguntarValor()
}


function perguntarValor() {
    let divBotoes = document.getElementById('botoes')
    let tipoSelect = document.getElementById('tipo')

    console.log(tipoSelect)

    tipoSelect.innerHTML = ''
    divBotoes.innerHTML = ''

    for (let index = 0; index < LISTA_VEICULOS.length; index++) {
        const item = LISTA_VEICULOS[index];
        let valorSavoAntes = localStorage.getItem(item.id)
        if (!valorSavoAntes) {
            let valor = prompt(item.textoPergunta)
            localStorage.setItem(item.id, valor)
        }
        const botao = `
      <button onclick="atualizarValorHora('${item.id}')">${item.textoBotao}</button>
    `
        const option = `<option value="${item.tipo}">${item.tipo.toUpperCase()}</option>`
        console.log(botao);
        divBotoes.innerHTML += botao
        tipoSelect.appendChild(option)
    }
}


function limparCampos() {
    document.getElementById('placa').value = ''
    document.getElementById('modelo').value = ''
    document.getElementById('marca').value = ''
    document.getElementById('cor').value = ''
}


function adicionarCarro() {
    let placaInput = document.getElementById('placa').value
    let modeloInput = document.getElementById('modelo').value
    let marcaInput = document.getElementById('marca').value
    let corInput = document.getElementById('cor').value
    let tipoInput = document.getElementById('tipo').value

    console.log(tipoInput)
    /*   if(!tipoInput) {
        alert('Tipo é Obrigatório')
        return
      }
      
      if(placaInput == "" || placaInput==null || placaInput == undefined) {
        alert('A placa é obrigatoria!!!!!!')
        return
      } */

    if (!tipoInput || !placaInput) {
        alert('Preencha Tipo e Placa!!!!!!')
        return
    }

    const carro = {
        placa: placaInput,
        modelo: modeloInput,
        marca: marcaInput,
        cor: corInput,
        horaEntrada: new Date()
    }

    LISTA_CARROS.push(carro)

    limparCampos()

    montarLista()
}


function montarLista() {
    if (LISTA_CARROS.length > 0) {
        const elementoLista = document.getElementById('listaCarros')
        elementoLista.innerHTML = ''
        for (let index = 0; index < LISTA_CARROS.length; index++) {
            const carro = LISTA_CARROS[index];
            //console.log(carro)
            //const aux = '<div> Placa: ' + carro.placa + ' - Cor: ' + carro.cor + ' - Marca: ' +  carro.marca + ' - Modelo: ' + carro.modelo + '</div>'
            const item = `<div>Placa: ${carro.placa} - Cor: ${carro.cor} - Marca: ${carro.marca} - Modelo: ${carro.modelo} </div>`
            elementoLista.innerHTML += item
        }
    }
}


function cobrarCarro() {
    // criar um input - OK
    // ler valor do input
    const placaInput = document.getElementById('placaParaCobrar').value
    // se input estiver vazio -> soltar um alerta e encerrar execução
    // !placaInput é equivalente a placaInput == '' || placaInput == null || placaInput == undefined
    if (!placaInput) {
        alert('Placa Obrigatória')
        return
    }
    // buscar no array/lista -> LISTA_CARROS
    for (let index = 0; index < LISTA_CARROS.length; index++) {
        const carro = LISTA_CARROS[index];
        // verificar se o carro está na lista
        if (carro.placa == placaInput) {
            // se ele tiver -> efetuar cobrança
            let horaSaida = new Date()
            let horasEmMiliSegundos = horaSaida - carro.horaEntrada
            console.log(horasEmMiliSegundos)

            // converter de milisegundo para segundo
            let horaEmSegundos = horasEmMiliSegundos / 1000
            console.log(horaEmSegundos)

            // converter de segundos para minutos
            let horaEmMinutos = horaEmSegundos / 60
            console.log(horaEmMinutos)

            // converter de minutos para horas
            let hora = horaEmMinutos / 60
            console.log(hora)

            let valorHora = parseFloat(localStorage.getItem('valorHora'))
            let valorFinal = hora * valorHora

            console.log(valorFinal.toFixed(2))
        }
    }
    // se não estiver -> soltar um alerta
}
