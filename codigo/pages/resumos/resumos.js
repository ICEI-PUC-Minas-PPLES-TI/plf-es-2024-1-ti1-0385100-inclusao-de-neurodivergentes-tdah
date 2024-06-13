function toggleResumo() {
    var fazerResumoDiv = document.getElementById('fazer-resumo');
    
    if (fazerResumoDiv.classList.contains('show')) {
        fazerResumoDiv.classList.add('hide');
        setTimeout(function() {
            fazerResumoDiv.classList.remove('show');
            fazerResumoDiv.classList.remove('hide');
        }, 500);
    } else {
        esconderTodosFormularios();
        setTimeout(function() {
            fazerResumoDiv.classList.add('show');
        }, 10);
    }
}

document.addEventListener("DOMContentLoaded", function() {
});

function alternarExibicaoLista() {
    const listaMeusResumos = document.getElementById('lista-meus-resumos');
    const botaoFecharExistente = document.getElementById('botao-fechar');

    if (listaMeusResumos.style.display === 'block') {
        listaMeusResumos.style.display = 'none'; 
        if (botaoFecharExistente) {
            botaoFecharExistente.remove(); 
        }
    } else {
        exibirTitulosResumos();
    }
}

document.querySelector('#meus-resumos').addEventListener('click', alternarExibicaoLista);

function exibirTitulosResumos() {

    const listaTitulos = document.querySelector('#lista-titulos');
    listaTitulos.innerHTML = '';

    const resumos = JSON.parse(localStorage.getItem('resumos')) || [];

    resumos.forEach(resumo => {
        const itemLista = document.createElement('li');
        itemLista.textContent = resumo.titulo;

        const botaoVisualizar = document.createElement('button');
        botaoVisualizar.textContent = 'Visualizar';
        botaoVisualizar.addEventListener('click', () => visualizarResumo(resumo.titulo));

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.addEventListener('click', () => excluirResumo(resumo.titulo));

        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.addEventListener('click', () => editarResumo(resumo.titulo));

        itemLista.appendChild(botaoVisualizar);
        itemLista.appendChild(botaoExcluir);
        itemLista.appendChild(botaoEditar);

        listaTitulos.appendChild(itemLista);
    });

    const listaMeusResumos = document.getElementById('lista-meus-resumos');
    listaMeusResumos.style.display = 'block';

    if (!document.getElementById('botao-fechar')) {
        const botaoFechar = document.createElement('button');
        botaoFechar.id = 'botao-fechar';
        botaoFechar.textContent = 'Fechar';
        botaoFechar.addEventListener('click', alternarExibicaoLista);
        listaMeusResumos.appendChild(botaoFechar);
    }
}

function excluirResumo(titulo) {
    if (confirm(`Tem certeza que deseja excluir o resumo "${titulo}"?`)) {
        let resumos = JSON.parse(localStorage.getItem('resumos')) || [];
        resumos = resumos.filter(resumo => resumo.titulo !== titulo);
        localStorage.setItem('resumos', JSON.stringify(resumos));
        exibirTitulosResumos();
    }
}


function editarResumo(titulo) {
    esconderTodosFormularios();
    if (confirm(`Deseja editar o resumo "${titulo}"?`)) {
        const resumos = JSON.parse(localStorage.getItem('resumos')) || [];
        const resumo = resumos.find(r => r.titulo === titulo);
        if (resumo) {
            
            document.querySelector('.insira-titulo').value = resumo.titulo;
            document.querySelector('.insira-resumo').value = resumo.resumo;

            toggleResumo();

            const salvarBtn = document.querySelector('.salvar-resumo');
            salvarBtn.style.display = 'inline';
            salvarBtn.textContent = 'SALVAR ALTERAÇÕES';
            salvarBtn.removeEventListener('click', salvarResumoHandler);
            salvarBtn.addEventListener('click', () => {
                salvarEdicoesResumo(titulo); 
            });
        }
    }
}

function salvarEdicoesResumo(tituloOriginal) {
    const tituloInput = document.querySelector('.insira-titulo').value;
    const resumoTextarea = document.querySelector('.insira-resumo').value;
    let resumos = JSON.parse(localStorage.getItem('resumos')) || [];
    const index = resumos.findIndex(r => r.titulo === tituloOriginal);

    if (index !== -1) {
        resumos[index].titulo = tituloInput;
        resumos[index].resumo = resumoTextarea;
        localStorage.setItem('resumos', JSON.stringify(resumos));
        alert('Resumo editado com sucesso!');
        exibirTitulosResumos(); 
    }
}


function exibirFormularioCriacao() {
    esconderTodosFormularios();

    document.querySelector('.insira-titulo').value = '';
    document.querySelector('.insira-resumo').value = '';


    document.querySelector('.salvar-resumo').textContent = 'SALVAR';

   
    document.querySelector('.salvar-resumo').onclick = salvarNovoResumo;

    if (!document.getElementById('fazer-resumo').classList.contains('show')) {
        toggleResumo();
    }
}


function salvarNovoResumo() {
    const titulo = document.querySelector('.insira-titulo').value;
    const resumo = document.querySelector('.insira-resumo').value;

    if (titulo.trim() !== '' && resumo.trim() !== '') {
        const novoResumo = {
            titulo: titulo,
            resumo: resumo
        };

        let resumos = JSON.parse(localStorage.getItem('resumos')) || [];
        resumos.push(novoResumo);
        localStorage.setItem('resumos', JSON.stringify(resumos));

        alert('Resumo salvo com sucesso!');

        exibirTitulosResumos(); 
    } else {
        alert('Por favor, preencha o título e o resumo antes de salvar.');
    }
}


document.querySelector('.bt-criar-resumo').addEventListener('click', exibirFormularioCriacao);


function visualizarResumo(titulo) {
    esconderTodosFormularios();
    const resumos = JSON.parse(localStorage.getItem('resumos')) || [];
    const resumo = resumos.find(r => r.titulo === titulo);
    if (resumo) {
        const visualizacaoResumoDiv = document.getElementById('visualizacao-resumo');
        visualizacaoResumoDiv.innerHTML = `
            <h2>${resumo.titulo}</h2>
            <p>${resumo.resumo}</p>
            <button id="fechar-visualizacao">Fechar</button>
        `;
        visualizacaoResumoDiv.style.display = 'block';

       
        document.getElementById('fechar-visualizacao').addEventListener('click', () => {
            visualizacaoResumoDiv.style.display = 'none';
        });
    } else {
        alert('Resumo não encontrado.');
    }
}


function esconderTodosFormularios() {
    const fazerResumoDiv = document.getElementById('fazer-resumo');
    const visualizacaoResumoDiv = document.getElementById('visualizacao-resumo');

    if (fazerResumoDiv.classList.contains('show')) {
        fazerResumoDiv.classList.remove('show');
    }

    visualizacaoResumoDiv.style.display = 'none';
}


window.onload = exibirTitulosResumos;


function salvarResumoGerado(titulo, conteudo) {
    const novoResumo = {
        titulo: titulo,
        resumo: conteudo
    };

    let resumos = JSON.parse(localStorage.getItem('resumos')) || [];
    resumos.push(novoResumo);
    localStorage.setItem('resumos', JSON.stringify(resumos));

    alert('Resumo salvo com sucesso!');
    exibirTitulosResumos(); 
}


document.getElementById('bt-gerar-resumo').addEventListener('click', () => {
    esconderTodosFormularios();
    toggleResumo(); 

    const tituloInput = document.querySelector('.insira-titulo');
    const resumoTextarea = document.querySelector('.insira-resumo');

    
    resumoTextarea.value = '';
    tituloInput.value = ''; 
    tituloInput.placeholder = 'Insira o Tema'; 

    document.querySelector('.salvar-resumo').style.display = 'none';
});


document.querySelector('.gerar-resumo').addEventListener('click', async () => {
    const tituloInput = document.querySelector('.insira-titulo');
    const resumoTextarea = document.querySelector('.insira-resumo');

    if (!tituloInput.value) {
        alert('Insira o Tema');
        return;
    }

    const response = await getCompletion(tituloInput.value);
    resumoTextarea.value = response.choices[0].text; 

    const salvarBtn = document.querySelector('.salvar-resumo');
    salvarBtn.style.display = 'inline';
});

document.addEventListener('DOMContentLoaded', () => {
    const salvarBtn = document.querySelector('.salvar-resumo');
    salvarBtn.addEventListener('click', salvarResumoHandler);
});

function salvarResumoHandler() {
    const tituloInput = document.querySelector('.insira-titulo');
    const resumoTextarea = document.querySelector('.insira-resumo');
    salvarResumoGerado(tituloInput.value, resumoTextarea.value);
}

function mostrarCarregando() {
    var textarea = document.getElementById('resumo-textarea');
    var originalText = textarea.value; 
    textarea.placeholder = ''; 
    textarea.value = 'Gerando resumo, por favor aguarde...'; 

   
    setTimeout(() => {
        textarea.value = originalText; 
        textarea.placeholder = 'Insira o Resumo'; 
    }, 3000); 
}

function setupEventListeners() {
    var gerarButton = document.querySelector('.gerar-resumo');
    gerarButton.removeEventListener('click', mostrarCarregando);
    gerarButton.addEventListener('click', mostrarCarregando);
}

setupEventListeners();
