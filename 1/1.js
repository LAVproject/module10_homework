// Кнопка переключатель
const btnToggle = document.querySelector('#btn-toggle');
// Элемент вывода иконки кнопки
const btnIcon = document.querySelector('#btn-icon');

// Подписка на событие клик по кнопке переключателя
btnToggle.addEventListener('click', () => {
    // Меняем иконку туда или обратно
    btnIcon.classList.toggle('icon_01');
    btnIcon.classList.toggle('icon_02');
});