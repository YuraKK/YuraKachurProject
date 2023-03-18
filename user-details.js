// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули

// записуємо силку на котрій знаходимось
let url = new URL(location.href);
// записуємо в неї всі значення після слова "data"
let json = url.searchParams.get('data');
// перетворюємо/парсимо для читання на сторінці значення об'єктів переданих силкою
let user = JSON.parse(json);
// головний дів
let div = document.createElement('div');
div.classList.add('main-user-info')
// функція відчиту та запису об'єктів
let getUserItem = (user) => {
    // переходимо в середину кожного об'єкту
    for (const userElement in user) {
        // перевірка чи елемент в середині також об'єкт
        if (typeof user[userElement] === 'object') {
            // дів для запису
            const divElement = document.createElement('div');
            divElement.classList.add('div-users-info')
            // виводимо назву об'єкту перед його значеннями
            divElement.innerText =`${userElement} -`;
            div.appendChild(divElement);
            // відправляємо об'єкт назад щоб витягнути його значення
            getUserItem(user[userElement]);

        }
        // витягуємо та записуємо значення значення об'єтків
        else {
            const divElement = document.createElement('div');
            divElement.classList.add('div-users-info')
            // ключ : значення ключа
            divElement.innerText = `${userElement} : ${user[userElement]}`;
            div.appendChild(divElement);
        }
    }
}
// поміщаємо в фунцію таблицю з переданими об'єктами
getUserItem(user);
document.body.append(div);

// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//  6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку
//  post-details.html, котра має детальну інфу про поточний пост.

///створюємо кнопку : клас/значення/класи для стилів
let button = document.createElement('button');
button.classList.add('user-button')
button.innerText = 'Post of current user'
let divCenter = document.createElement('div')
divCenter.classList.add('div-center');
let divTitle = document.createElement('div');
divTitle.classList.add('container')

button.onclick = () =>{
    // витягую апі з user.id - беру з обєкту висланого в user-details
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`, {
    })
        // responce - приписує собі все з урли
        // responce.json - перетворює все на можливі для відчиту обєкти
        .then((response) => response.json())
        .then((usersPosts) =>{
            // створюю оболонки та приписую в них значення кожного посту
            for (const usersPostElement of usersPosts) {
                // загальний
                    const divPost = document.createElement('div')
                    divPost.classList.add('block')
                    //роблю параграф
                    let p = document.createElement('p');
                    p.classList.add('p-user')
                    //суну в параграф title елементу
                    p.innerText = `text : ${usersPostElement.title}`;
                    // силка
                    let a = document.createElement('a')
                    a.classList.add('a-user')
                    a.innerText = `click to read post`;
                    // куди ми відправляємо дані + спарсовані дані
                    a.href = 'post-details.html?data=' + JSON.stringify(usersPostElement);
                    // добавляю параграф в дів
                divPost.append(p,a)
                divTitle.appendChild(divPost)
            }
            // виводжу дів в боді
            divCenter.appendChild(divTitle)
            document.body.appendChild(divCenter)
        })
}
document.body.appendChild(button);