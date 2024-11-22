document.addEventListener("DOMContentLoaded", () => {
    // === Плавное появление контента ===
    const mainContent = document.querySelector("main");
    if (mainContent) mainContent.classList.add("fade-in");

    // === Работа с модальным окном ===
    const modal = document.getElementById("deleteModal");
    const closeModal = modal?.querySelector(".close");
    const confirmDelete = document.getElementById("confirmDelete");
    const cancelDelete = document.getElementById("cancelDelete");
    let deleteLink; 

    if (modal) {
        window.openModal = function (link) {
            deleteLink = link;
            modal.style.display = "block";
        };

        closeModal?.addEventListener("click", () => {
            modal.style.display = "none";
        });

        cancelDelete?.addEventListener("click", () => {
            modal.style.display = "none";
        });

        confirmDelete?.addEventListener("click", () => {
            if (deleteLink) window.location.href = deleteLink;
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // === Показать/скрыть фильтр ===
    const filterButton = document.getElementById("filterButton");
    const filterForm = document.querySelector(".filter-form");

    if (filterButton && filterForm) {
        filterForm.style.display = "none"; 
        filterButton.addEventListener("click", () => {
            filterForm.style.display =
                filterForm.style.display === "none" || filterForm.style.display === ""
                    ? "flex"
                    : "none";
        });
    } else {
        console.error("Кнопка фильтрации или форма не найдены.");
    }

    // === Форматирование цен в таблице ===
    const priceCells = document.querySelectorAll(".item-table .price-cell");
    priceCells.forEach((cell) => {
        const price = parseFloat(cell.textContent.replace(/,/g, ""));
        if (!isNaN(price)) {
            cell.textContent = price.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
            });
        }
    });

    // === Плавное появление таблицы ===
    const table = document.querySelector(".item-table");
    if (table) {
        table.style.opacity = "0";
        setTimeout(() => {
            table.style.transition = "opacity 1.5s ease-in-out";
            table.style.opacity = "1";
        }, 200);
    }

    // === Подсветка активных ссылок меню ===
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((link) => {
        if (link.href === window.location.href) {
            link.style.color = "#c1a469";
        }
    });

    const priceInput = document.querySelector('input[name="price"]');

    priceInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/[^\d.]/g, ''); 
        e.target.value = value; 
    });

    priceInput.addEventListener('blur', function () {
        let value = priceInput.value.replace(/[^\d.]/g, ''); 
        if (!value) {
            priceInput.value = '0.00';  
        } else {
            const parts = value.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
            if (parts.length < 2) {
                parts[1] = '00';  
            } else {
                parts[1] = parts[1].slice(0, 2); 
            }
            priceInput.value = parts.join('.');
        }
    });

    // === Инициализация фильтра цены ===
    const minPriceInput = document.getElementById("min-price");
    const maxPriceInput = document.getElementById("max-price");
    const priceBarFill = document.querySelector(".price-bar-fill");

    if (minPriceInput && maxPriceInput && priceBarFill) {
        function updatePriceBar() {
            const minValue = parseFloat(minPriceInput.value);
            const maxValue = parseFloat(maxPriceInput.value);
            const totalRange = 10000; // Максимальное значение

            const fillWidth = ((maxValue - minValue) / totalRange) * 100;
            const fillLeft = (minValue / totalRange) * 100;

            priceBarFill.style.width = `${fillWidth}%`;
            priceBarFill.style.left = `${fillLeft}%`;
        }

        minPriceInput.addEventListener("input", updatePriceBar);
        maxPriceInput.addEventListener("input", updatePriceBar);

        document.getElementById("apply-filters").addEventListener("click", function () {
            const selectedMinPrice = parseFloat(minPriceInput.value);
            const selectedMaxPrice = parseFloat(maxPriceInput.value);
            console.log("Выбранная минимальная цена:", selectedMinPrice);
            console.log("Выбранная максимальная цена:", selectedMaxPrice);
        });

        updatePriceBar(); // Инициализация
    } else {
        console.error("Элементы фильтра цены не найдены.");
    }

    // === Пример интерактивного действия ===
    const buttons = document.querySelectorAll("button:not(.no-alert)");
    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            if (event.target.type !== "submit") {
                alert("Button clicked!");
            }
        });
    });
});