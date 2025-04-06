document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("surveyForm");
    const nameInput = document.getElementById("name");
    const colorInput = document.getElementById("favColor");
    const spicinessInput = document.getElementById("spiciness");
    const article = document.querySelector("article");

    colorInput.addEventListener("input", function () {
        article.style.backgroundColor = colorInput.value;
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const favoriteColor = colorInput.value;
        const spiciness = spicinessInput.value;
        const selectedFood = Array.from(document.querySelectorAll('input[name="food"]:checked')).map(el => el.value);
        const selectedDrink = document.querySelector('input[name="drink"]:checked')?.value || "Не выбрано";
        const cuisine = document.getElementById("cuisine").value;
        const review = document.getElementById("review").value.trim();

        if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(name)) {
            alert("Введите корректное имя (только буквы и пробелы)!");
            return;
        }

        if (selectedFood.length === 0) {
            alert("Выберите хотя бы одно любимое блюдо!");
            return;
        }

        const userData = {
            name,
            favoriteColor,
            selectedFood,
            cuisine,
            selectedDrink,
            spiciness,
            review
        };

      
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(userData);

        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("userData", JSON.stringify(userData));

        window.location.href = "result/result.html";
    });
});