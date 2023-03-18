// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули

//url  з інформацією
fetch('https://jsonplaceholder.typicode.com/users', {
    })
    // змінна response - перетворена в json object для відчиту
        .then((response) => response.json())
    // готова до використання таблиця з об'єктами
        .then((users) =>{
            // діви в які ми записуємо обєкти
            let div = document.createElement('div');
            div.classList.add('user-item');
            let divLeft = document.createElement('div');
            let divRight = document.createElement('div');
            divLeft.classList.add('divLeft-user-item');
            divRight.classList.add('divRight-user-item');
            // залазимо в кожен об'єкт з масиву users
        for (const user of users) {
            //для розприділення на 2 колонки по парних/непарних id
            if (user.id%2 === 0) {
                // link для переходу на об'єкт
                let a = document.createElement('a')
                a.classList.add('a-main')
                // значення лінку містить айді та ім'я кожного об'єкту
                a.innerText = `id: ${user.id}   name: ${user.name}`;
                // робимо нашу силку яку передаємо на наступну сторінку
                a.href = 'user-details.html?data=' +
                    // закладаємо значення в силку котру ми передаємо
                    + JSON.stringify(user);
                // додаємо до лівого діву
                divLeft.append(a);

                // ідентично для непарних
            }else {
                    let a = document.createElement('a')
                    a.classList.add('a-main')
                    a.innerText = `id: ${user.id} name: ${user.name}`;
                    a.href = 'user-details.html?data=' + JSON.stringify(user);
                    divRight.append(a);
            }
            // об'єднуємо 2 діви/контейнери
            div.append(divRight, divLeft)
        }
        // додаємо на сторінку
            document.body.append(div);
    })

