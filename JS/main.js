var modal = document.getElementById("novolivro");
var btn = document.getElementById("openPopupBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function selectFormat(format) {
    var buttons = document.querySelectorAll('.container .radio-group:nth-child(1) .radio-button');
    buttons.forEach(function(button) {
        button.classList.remove('active');
    });
    document.getElementById("formatoInput").value = format;
    event.currentTarget.classList.add('active');
}

function selectLista(lista) {
    var buttons = document.querySelectorAll('.container .radio-group:nth-child(2) .radio-button');
    buttons.forEach(function(button) {
        button.classList.remove('active');
    });
    document.getElementById("listaInput").value = lista;
    event.currentTarget.classList.add('active');
}

// Adicionando lógica para permitir apenas uma escolha
document.querySelectorAll('.radio-group .radio-button').forEach(function(button) {
    button.addEventListener('click', function(event) {
        var parent = this.closest('.radio-group');
        var buttons = parent.querySelectorAll('.radio-button');
        buttons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
    });
});

// Selecionando todos os links
const links = document.querySelectorAll('a');

// Adicionando evento de clique para cada link
links.forEach(link => {
    link.addEventListener('click', function(event) {
        // Prevenindo o comportamento padrão de seguir o link
        event.preventDefault();

        // Removendo a classe 'clicked' de todos os links
        links.forEach(link => link.classList.remove('clicked'));

        // Adicionando a classe 'clicked' ao link clicado
        this.classList.add('clicked');
    });
});

function ajustarEstilo(elemento) {
    // Reiniciar todos os estilos
    document.querySelectorAll('.lista, .biblioteca, .andamento, .concluido, .abandonado').forEach(el => {
        el.style.borderBottom = 'none'; // Reiniciar a borda
        el.style.paddingBottom = '19px'; // Reiniciar
    });

    // Aplicar estilo ao elemento clicado
    if (elemento.classList.contains('lista')) {
        elemento.style.borderBottom = '4px solid #D51E24';
        elemento.style.paddingbottom = '19px';
        elemento.style.marginRight = '101px';
    } else if (elemento.classList.contains('biblioteca')) {
        elemento.style.borderBottom = '4px solid #D51E24';
        elemento.style.paddingbottom = '19px';
        elemento.style.marginRight = '104px';
    } else if (elemento.classList.contains('andamento')) {
        elemento.style.borderBottom = '4px solid #D51E24';
        elemento.style.paddingbottom = '19px';
        elemento.style.marginRight = '100px';
    } else if (elemento.classList.contains('concluido')) {
        elemento.style.borderBottom = '4px solid #D51E24';
        elemento.style.paddingbottom = '19px';
        elemento.style.marginRight = '105px';
    } else if (elemento.classList.contains('abandonado')) {
        elemento.style.borderBottom = '4px solid #D51E24';
        elemento.style.paddingbottom = '19px';
        elemento.style.marginRight = '223px';
    }
}

// Exemplo de evento de clique para demonstração
document.addEventListener('DOMContentLoaded', function() {
    // Adicione eventos de clique aos elementos desejados
    document.querySelectorAll('.lista, .biblioteca, .andamento, .concluido, .abandonado').forEach(el => {
        el.addEventListener('click', function() {
            ajustarEstilo(this);
        });
    });
});


