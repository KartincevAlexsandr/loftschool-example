/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function () {
    genTable(2);
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
});

addButton.addEventListener('click', () => {
    if (addNameInput.value !== '' && addValueInput.value !== '') {
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;
        genTable(1);
    }
    // здесь можно обработать нажатие на кнопку "добавить cookie"
});
function isMatching(full, chunk) {
    if (full.toUpperCase().indexOf(chunk.toUpperCase()) == -1) {
        return false;
    }

    return true;
}

function parseCoockie() {
    return document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});
}

function genTable(filter) {
    let tables = parseCoockie();

    listTable.innerHTML = '';
    for (let key in tables) {
        if (tables.hasOwnProperty(key)) {

            var filtern;

            if (filter == 2) {
                filtern = `${key} ${tables[key]}`;
            } else {
                filtern = `${tables[key]}`;
            }

            if (isMatching(filtern, filterNameInput.value)) {
                let tr = document.createElement('tr');
                let td1 = document.createElement('td');
                let button = document.createElement('button');

                td1.innerText = key;
                td1.className = key;
                tr.appendChild(td1);
                td1 = document.createElement('td');
                td1.innerText = tables[key];
                tr.appendChild(td1);
                td1 = document.createElement('td');
                button.value = key;
                button.addEventListener('click', () => {
                    var today = new Date(new Date().getTime() - 10000);

                    document.cookie = `${key}=; patch=/; expires= ${today.toUTCString()}`
                    listTable.removeChild(tr);
                })
                td1.appendChild(button);
                tr.appendChild(td1);
                listTable.appendChild(tr);
            }
        }
    }
}

genTable(2);