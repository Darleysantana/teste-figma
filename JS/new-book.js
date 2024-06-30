document.addEventListener('DOMContentLoaded', () => {
    renderTable();

    // Abrir o popup para adicionar um novo livro
    document.getElementById('openPopupBtn').onclick = function() {
        openbook('create');
        document.getElementById('novolivro').style.display = 'block';
    };
    document.getElementById('edit').onclick = function() {
        openbook('edit', '${book.id}', '${book.capa}', '${book.titulo}', '${book.categoria}', '${book.formato}','${book.local}', '${book.linkagem}');
        document.getElementById('novolivro').style.display = 'block';
    };

    // Fechar o popup
    document.querySelector('.close').onclick = function() {
        document.getElementById('novolivro').style.display = 'none';
    };

    // Salvar livro (novo ou editar)
    document.getElementById('crudForm').onsubmit = function(event) {
        event.preventDefault();
        const itemid = document.getElementById('itemId').value;
        const itemImage = document.getElementById('itemImage').files[0];
        const itemName = document.getElementById('itemName').value;
        const itemcategoria = document.getElementById('itemcategoria').value;
        const formatoInput = document.getElementById('formatoInput').value;
        const listaInput = document.getElementById('listaInput').value;
        const linkar = document.getElementById('linkar').value;

        if (itemid === '' || currentIndex === -1) {
            createLivro(itemImage, itemName, itemcategoria, formatoInput, listaInput, linkar);
        } else {
            updateLivro(itemImage, itemName, itemcategoria, formatoInput, listaInput, linkar);
        }

        document.getElementById('novolivro').style.display = 'none';
    };
});

let currentIndex = -1;
let books = [
    
];

function openbook(action, id = '', capa = '', titulo = '', categoria = '', formato = '', local = '', linkagem = '') {
    const title = document.getElementById('livroTitle');
    const itemId = document.getElementById('itemId');
    const itemImage = document.getElementById('itemImage');
    const itemName = document.getElementById('itemName');
    const itemcategoria = document.getElementById('itemcategoria');
    const formatoInput = document.getElementById('formatoInput');
    const listaInput = document.getElementById('listaInput');
    const linkar = document.getElementById('linkar');

    if (action === 'create') {
        title.innerHTML = 'Adicionar Novo Livro';
        itemId.value = '';
        itemImage.value = '';
        itemName.value = '';
        itemcategoria.value = '';
        formatoInput.value = '';
        listaInput.value = '';
        linkar.value = '';
        currentIndex = -1;
    } else if (action === 'edit') {
        title.innerHTML = 'Editar Livro';
        itemId.value = id;
        itemImage.value = ''; // Limpar o input de file
        itemName.value = titulo;
        itemcategoria.value = categoria;
        formatoInput.value = formato;
        listaInput.value = local;
        linkar.value = linkagem;
        currentIndex = id;
    }

    document.getElementById('novolivro').style.display = 'block';
}

function createLivro(capa, titulo, categoria, formato, local, linkagem) {
    if (capa) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const id = books.length + 1;
            books.push({ id, capa: e.target.result, titulo, categoria, formato, local, linkagem });
            renderTable();
        };
        reader.readAsDataURL(capa);
    } else {
        const id = books.length + 1;
        books.push({ id, capa: '', titulo, categoria, formato, local, linkagem });
        renderTable();
    }
}

function updateLivro(capa, titulo, categoria, formato, local, linkagem) {
    const index = books.findIndex(book => book.id == currentIndex);
    if (index !== -1) {
        if (capa) {
            const reader = new FileReader();
            reader.onload = function(e) {
                books[index].capa = e.target.result;
                books[index].titulo = titulo;
                books[index].categoria = categoria;
                books[index].formato = formato;
                books[index].local = local;
                books[index].linkagem = linkagem;
                renderTable();
            };
            reader.readAsDataURL(capa);
        } else {
            books[index].titulo = titulo;
            books[index].categoria = categoria;
            books[index].formato = formato;
            books[index].local = local;
            books[index].linkagem = linkagem;
            renderTable();
        }
    }
}

function deletelivro(id) {
    books = books.filter(book => book.id != id);
    renderTable();
}

function adicionarBiblioteca(id) {
    alert('Livro adicionado à biblioteca com sucesso!');
    deletelivro(id);
}

// function renderTable() {
//     const tableBody = document.getElementById('itemDiv');
//     tableBody.innerHTML = '';
//     books.forEach(book => {
//         const row = `
//                     <div class="rectangle-21-${book.id}">
//                         <img img src="${book.capa}" alt="${book.titulo}" class="img325">
//                         <div class="group-168"> 
//                             <p class="title">${book.titulo}</p>
//                             <p class="tipo">Categoria: </p>
//                             <p class="categoria">${book.categoria}</p>
//                         </div>
//                         <button type="button" class="carrinho"><i class="bi bi-cart3"></i><span style="margin-right: 10px;"></span>Comprar</button>
//                         <button type="button" class="edit" onclick="openbook('edit', '${book.id}', '${book.capa}', '${book.titulo}', '${book.categoria}', '${book.formato}','${book.local}', '${book.linkagem}')"><span class="tooltip"></span><i class="bi bi-pencil-square"></i></button>
//                         <button type="button" class="ad-biblioteca" onclick="adicionarBiblioteca(${book.id})"><span class="tooltip"></span><i class="fa-solid fa-book"></i></button>
//                         <button type="button" class="trash" onclick="deletelivro(${book.id})"><span class="tooltip"></span><i class="bi bi-trash-fill"></i></button>
//                     </div>`;
//         tableBody.insertAdjacentHTML('beforeend', row);
//     });
// }

function selectFormat(format) {
    document.getElementById('formatoInput').value = format;
    const buttons = document.querySelectorAll('.radio-group .radio-button');
    buttons.forEach(button => button.classList.remove('selected'));
    document.querySelector(`.radio-group .radio-button[onclick="selectFormat('${format}')"]`).classList.add('selected');
}

function selectLista(lista) {
    document.getElementById('listaInput').value = lista;
    const buttons = document.querySelectorAll('.radio-group .radio-button');
    buttons.forEach(button => button.classList.remove('selected'));
    document.querySelector(`.radio-group .radio-button[onclick="selectLista('${lista}')"]`).classList.add('selected');
}
