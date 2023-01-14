const form = document.getElementById('form-adiciona-contato');
const corpoTabela = document.querySelector('tbody');
let listaNomes = [];
let listaNumeros = [];
const nomeContato = document.getElementById('nome-do-contato');
const numeroContato = document.getElementById('numero-do-contato');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionarContato()
    atualizarTabela()
})

const isNumericInput = (event) => {
	const key = event.keyCode;
	return ((key >= 48 && key <= 57) || // Allow number line
		(key >= 96 && key <= 105) // Allow number pad
	);
};

const isModifierKey = (event) => {
	const key = event.keyCode;
	return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
		(key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
		(key > 36 && key < 41) || // Allow left, up, right, down
		(
			// Allow Ctrl/Command + A,C,V,X,Z
			(event.ctrlKey === true || event.metaKey === true) &&
			(key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
		)
};

const enforceFormat = (event) => {
	// Input must be of a valid number format or a modifier key, and not longer than ten digits
	if(!isNumericInput(event) && !isModifierKey(event)){
		event.preventDefault();
	}
};

const formatToPhone = (event) => {
	if(isModifierKey(event)) {return;}

	// I am lazy and don't like to type things more than once
	const target = event.target;
	const input = event.target.value.replace(/\D/g,'').substring(0,11); // First ten digits of input only
	const zip = input.substring(0,2);
	const middle = input.substring(2,7);
	const last = input.substring(7,11);

	if(input.length > 7){target.value = `(${zip}) ${middle}-${last}`;}
	else if(input.length > 1){target.value = `(${zip}) ${middle}`;}
	else if(input.length > 0){target.value = `(${zip}`;}
};

const inputElement = document.getElementById('numero-do-contato');
inputElement.addEventListener('keydown',enforceFormat);
inputElement.addEventListener('keyup',formatToPhone);


function atualizarTabela() {
    let linhas = ''

        for (var i = 0; i < listaNomes.length; i++){
            linhas += `<tr><td>${listaNomes[i]}</td> <td>${listaNumeros[i]}</td></tr>`
        }
        corpoTabela.innerHTML = linhas
}

function VerificaContatoExiste() {
    if (nomeContato.value != '' && numeroContato.value != '') {
        if (listaNomes.includes(nomeContato.value) && listaNumeros.includes(numeroContato.value)) {
            return true
        }
    } else if (nomeContato.value != '' && numeroContato.value == '') {
        if (listaNomes.includes(nomeContato.value)) {
            return true
        }
    } else if (nomeContato.value == '' && numeroContato.value != '') {
        if (listaNumeros.includes(numeroContato.value)) {
            return true
        }
    }
    return false
}

function deletarContato() {
    contatoExiste = VerificaContatoExiste()

    if (contatoExiste) {
        if (nomeContato.value != '') {
            var posicaoContato = listaNomes.indexOf(nomeContato.value)
        } else if (nomeContato.value == '') {
            var posicaoContato = listaNumeros.indexOf(numeroContato.value)
        }
        listaNomes.splice(posicaoContato, 1)
        listaNumeros.splice(posicaoContato, 1)
    } else if (nomeContato.value != '' || numeroContato.value != ''){
        alert('Este contato não existe')
    } else {
        alert('Por favor preencha o nome ou número do contato para deleta-lo')
    }
    nomeContato.value = ''
    numeroContato.value = ''

    atualizarTabela()
}

function adicionarContato() {
    var telefoneValido = false

    if (numeroContato.value.length === 15) {
        telefoneValido = true
    }
    if (!telefoneValido) {
        alert('Este número de telefone não é válido')
    } else if (listaNomes.includes(nomeContato.value)) {
        alert('Este contato já foi adicionado')
    } else {
        listaNomes.push(nomeContato.value)
        listaNumeros.push(numeroContato.value)
    }

    nomeContato.value = ''
    numeroContato.value = ''
}
