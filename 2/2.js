// Кнопка вывода данных о размере экрана
const btnViewScreenSize = document.querySelector('#btn-view_screen_size');

// Подписка на событие клик по кнопке
btnViewScreenSize.addEventListener('click', () => {
    // Выводим данные о размерах экрана
    alert(`Ширина: ${window.screen.width}; Высота: ${window.screen.height}.`)
});