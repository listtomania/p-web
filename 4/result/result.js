document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userGroup = document.getElementById("userGroup");


    function displayUserData(user) {
        document.getElementById("resultName").textContent = user.name || "Не указано";
        document.getElementById("resultColor").textContent = user.favoriteColor || "Не указано";
        document.getElementById("resultFood").textContent = user.selectedFood ? user.selectedFood.join(", ") : "Не указано";
        document.getElementById("resultCuisine").textContent = user.cuisine || "Не указано";
        document.getElementById("resultDrink").textContent = user.selectedDrink || "Не указано";
        document.getElementById("resultSpiciness").textContent = user.spiciness || "Не указано";
        document.getElementById("resultReview").textContent = user.review || "Нет";
    }

    if (userData) {
        displayUserData(userData);
    } else {
        console.warn("Нет данных текущего пользователя.");
    }

    if (userGroup) {
       

        if (users.length > 0) {
            users.forEach(user => {
                const option = document.createElement("option");
                option.textContent = user.name;
                option.value = user.name;
                userGroup.appendChild(option);
            });
        } 

        userGroup.addEventListener("change", function () {
            const selectedUserName = userGroup.value;
            const selectedUser = users.find(user => user.name === selectedUserName);

            if (selectedUser) {
                displayUserData(selectedUser); 
            } else {
                console.warn("Пользователь не найден.");
            }
        });
    } 

    const backButton = document.getElementById("backButton");
    if (backButton) {
        backButton.addEventListener("click", function () {
            window.location.href = "../index.html";
        });
    } 
});