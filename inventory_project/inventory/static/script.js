document.addEventListener("DOMContentLoaded", function() {
    // Плавное появление контента
    const mainContent = document.querySelector("main");
    mainContent.classList.add("fade-in");

    // Получаем элементы модального окна и кнопок
    const modal = document.getElementById("deleteModal");
    const closeModal = document.getElementsByClassName("close")[0];
    const confirmDelete = document.getElementById("confirmDelete");
    const cancelDelete = document.getElementById("cancelDelete");

    // Переменная для хранения ссылки на удаляемый элемент
    let deleteLink;

    // Функция для открытия модального окна
    window.openModal = function(link) {
        deleteLink = link; 
        modal.style.display = "block"; 
    }

    // Закрытие модального окна при нажатии на "x"
    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    // Закрытие модального окна при нажатии на кнопку "Отмена"
    cancelDelete.onclick = function() {
        modal.style.display = "none";
    }

    // Обработка подтверждения удаления
    confirmDelete.onclick = function() {
        window.location.href = deleteLink; 
    }

    // Закрытие модального окна при клике вне его
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Пример интерактивного действия только для кнопок без класса 'no-alert'
    const buttons = document.querySelectorAll("button:not(.no-alert)");
    
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            if (event.target.type !== 'submit') { 
                alert("Button clicked!");
            }
        });
    });
});
