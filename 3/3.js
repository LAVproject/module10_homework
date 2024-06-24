// Эхо-сервер
const websocket = new WebSocket('wss://echo-ws-service.herokuapp.com');
// Форма ввода сообщения
const inputMessage = document.querySelector('#messenger-input-text')

// Функция отправляет запрос с сообщением на сервер
async function sendMessageServer(message, showResponse) {
    try {
        // Получено сообщение для отправки
        if (message) {
            // Добавляем сообщение в чат
            const addMessage = await addMessageChat(message, 'outgoing')
            // Сообщение добавлено в чат
            if (addMessage.status === true) {
                // Отправка сообщения
                websocket.send(message)
                // Чтение ответа
                websocket.onmessage = async function (event) {

                    // Ответ получен
                    if (event.data) {
                        // Вывод ответного сообщения в чат
                        if (showResponse === true) {
                            // Добавление ответного сообщения в чат
                            await addMessageChat(event.data, 'incoming')
                        }
                    }
                    // Ответ не получен
                    else {
                        console.log('Ответ не был получен!')
                    }
                }
            }
        }
        // Сообщение не получено
        else {
            console.log('Сообщение для отправки не получено! Отправлять нечего!')
        }
    }
    catch (error) {
        console.log('error', error)
    }
}

// Функция добавляет сообщение в чат
async function addMessageChat(message, type) {
    try {
        // Временный объект ответного сообщения выполнения функции
        const req = {}
        // Получены сообщение и его тип
        if (message && type) {
            // Блок чата
            const messengerChat = document.querySelector('#messenger-chat')

            // Создаем сообщение
            const div = document.createElement('div')
            // Добавляем стиль сообщения
            div.classList.add('messenger__chat-message')

            // Добавляем стиль типа сообщения
            switch (type) {
                // Исходящее сообщение
                case 'outgoing':
                    // Добавили класс типа сообщения
                    div.classList.add('outgoing')
                    // Добавили сообщение
                    div.append(message)
                    // Добавили сообщение в чат
                    messengerChat.append(div)
                    // Записали статус выполнения функции
                    req.status = true
                    // Прерываем выполнение
                    break
                // Входящее сообщение
                case 'incoming':
                    // Добавили класс типа сообщения
                    div.classList.add('incoming')
                    // Добавили сообщение
                    div.append(message)
                    // Добавили сообщение в чат
                    messengerChat.append(div)
                    // Записали статус выполнения функции
                    req.status = true
                    // Прерываем выполнение
                    break
                // Не определен
                default:
                    // Записали статус выполнения функции
                    req.status = false
                    console.log('Тип сообщения не определен! Сообщение в чат добавлено не будет!')
            }
            // Вернули статус выполнения функции
            return req
        }
        else {
            console.log('Аргументы переданы не были! Сообщение в чат добавлено не будет!')
            // Записали статус выполнения функции
            req.status = false
            // Вернули статус выполнения функции
            return req
        }
    }
    catch (error) {
        console.log('error', error)
    }
}

// Функция запрашивает текущую геолокацию пользователя
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        alert("Геолокация не поддерживается вашим браузером.");
    }
}

// Функция выводит полученную позицию
async function showPosition(position) {
    // Url на Openstreetmap
    const url = `https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`;
    // Создаем ссылку
    const link = document.createElement('a');
    // Заполняем атрибуты
    link.target = '_blank'
    link.innerText = 'Гео-локация'
    link.href = url

    // Отправляем сообщение на сервер
    await sendMessageServer(link)
}

// Установка соединения с сервером
websocket.onopen = function () {
    console.log("Соединение с сервером установлено...");
};

// Отслеживание закрытия соединения
websocket.onclose = function(event) {
    if (event.wasClean) {
        console.log('Соединение закрыто чисто');
    }
    else {
        console.log('Обрыв соединения');
    }
    console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

// Подписка на событие клик
document.querySelector('body').addEventListener('click', async (event) => {
    // ID элемента
    switch (event.target.id) {
        // Кнопка Отправить
        case 'btn-send':
            // Отправляем сообщение на сервер
            await sendMessageServer(inputMessage.value, true)
            break
        // Кнопка Гео-локация
        case 'btn-geolocation':
            // Получаем геолокацию
            getLocation()
            break
    }
})