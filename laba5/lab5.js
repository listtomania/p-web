function Course(name, faculty, numberOfStudents, email, ID, phoneNumber) {
    this.name = name;
    this.faculty = faculty;
    this.numberOfStudents = numberOfStudents;
    this.email = email;
    this.ID = ID;
    this.phoneNumber = phoneNumber;
}

const Service = {
    data: JSON.parse(localStorage.getItem('DataArray')) || [],
    addElement: function(name, faculty, numberOfStudents, email, phoneNumber) {
        const newCourse = new Course(name, faculty, numberOfStudents, email, this.getNextID(), phoneNumber);
        this.data.push(newCourse);
        this.saveToStorage();
    },
    deleteElementById: function(ID) {
        this.data = this.data.filter(element => element.ID !== ID);
        this.saveToStorage();
    },
    getNextID: function() {
        if (this.data.length === 0) return 0;
        const ids = this.data.map(item => item.ID).sort((a, b) => a - b);
        for (let i = 0; i < ids.length; i++) {
            if (ids[i] !== i) return i;
        }
        return ids.length;
    },
    saveToStorage: function() {
        localStorage.setItem('DataArray', JSON.stringify(this.data));
    },
    getFilteredAndSortedCourses: function() {
        return this.data
            .filter(it => parseInt(it.numberOfStudents) < 20)
            .sort((a, b) => parseInt(a.numberOfStudents) - parseInt(b.numberOfStudents));
    }
};

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\d{2}-\d{4}-\d{2}$/;
    return phoneRegex.test(phone);
}

let newCharacteristicValue = '';

function delForm() {
    document.getElementById("FirstForm").reset();
}

function handleAddElement(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const faculty = document.getElementById('faculty').value;
    const numberOfStudents = document.getElementById('numberOfStudents').value;
    const email = document.getElementById('email').value;
    const phoneNumber = newCharacteristicValue;

    if (name === '' || faculty === '' || numberOfStudents === '' || email === '') {
        document.querySelector('result1').textContent = 'Никаких данных не было введено';
        return;
    }

    if (parseInt(name) > 6) {
        document.querySelector('result1').textContent = 'Курс не более 6';
        return;
    }

    if (!isValidEmail(email)) {
        document.querySelector('result2').textContent = 'Введена неверная почта';
        return;
    }

    if (phoneNumber && !isValidPhone(phoneNumber)) {
        document.querySelector('result2').textContent = 'Неверный формат номера (должен быть XX-XXXX-XX)';
        return;
    }

    Service.addElement(name, faculty, numberOfStudents, email, phoneNumber);
    renderResultsTable();
    addIDToDelete();
    delForm();
}

var flag = 1;
function addNewPlace(event) {
    event.preventDefault();
    if (flag) {
        const newPlace = document.createElement('label');
        newPlace.textContent = 'Новая характеристика: ';
        const newPlaceText = document.createElement('input');
        newPlaceText.className = 'input';
        newPlaceText.type = 'tel';
        newPlaceText.pattern = "\d{2}\d{4}\d{3}";
        newPlaceText.placeholder = 'Введите характеристику';
        newPlaceText.addEventListener('input', function() {
            newCharacteristicValue = newPlaceText.value;
        });
        const newFormGroup = document.createElement('div');
        newFormGroup.className = 'form-group';
        newFormGroup.appendChild(newPlace);
        newFormGroup.appendChild(newPlaceText);
        const form = document.querySelector('.form'); 
        form.insertBefore(newFormGroup, document.querySelector('.buttons'));
        flag = 0;
    } else {
        return;
    }
}

function handleDeleteElement(event) {
    event.preventDefault();
    const ID = parseInt(document.getElementById('delID').value);
    Service.deleteElementById(ID);
    renderResultsTable();
    addIDToDelete();
}

function renderResultsTable() {
    addIDToDelete();
    const tbody = document.getElementById('data-table');
    tbody.innerHTML = '';
    const tableHeader = document.querySelector('.results-table thead');
    tableHeader.innerHTML = `
        <tr>
            <th>Курс</th>
            <th>Факультет</th>
            <th>Кол-во студентов</th>
            <th>Почта</th>
            <th>ID</th>
            <th>телефонный номер</th>
        </tr>
    `;
    if (Service.data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">Нет данных для отображения</td>
            </tr>
        `;
        return;
    }

    Service.data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.faculty}</td>
            <td>${item.numberOfStudents}</td>
            <td>${item.email}</td>
            <td>${item.ID}</td>
            <td>${item.phoneNumber}</td>
        `;
        tbody.appendChild(row);
    });
}

function renderSortedTable() {
    const filteredSortedData = Service.getFilteredAndSortedCourses();
    const tbody = document.getElementById('data-table');
    tbody.innerHTML = '';
    const tableHeader = document.querySelector('.results-table thead');
    tableHeader.innerHTML = `
        <tr>
            <th>Курс</th>
            <th>Факультет</th>
            <th>Кол-во студентов</th>
            <th>Почта</th>
            <th>ID</th>
            <th>телефонный номер</th>
        </tr>
    `;
    if (filteredSortedData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">Нет данных для отображения</td>
            </tr>
        `;
        return;
    }

    filteredSortedData.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.faculty}</td>
            <td>${item.numberOfStudents}</td>
            <td>${item.email}</td>
            <td>${item.ID}</td>
            <td>${item.phoneNumber}</td>
        `;
        tbody.appendChild(row);
    });
}

function handleSortFornumberOfStudents(event) {
    event.preventDefault();
    renderSortedTable();
}

function handleReturnToOriginalState(event) {
    event.preventDefault();
    renderResultsTable();
}

function addIDToDelete() {
    const select = document.getElementById("delID");
    select.innerHTML = '';
    Service.data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ID;
        option.textContent = item.ID;
        select.appendChild(option);
    });
}

console.log(hoistedVar);
var hoistedVar = 'value';
        
hoistedFunction(); 
function hoistedFunction() {
    console.log('Функция вызвана');
}

document.addEventListener('DOMContentLoaded', renderResultsTable);
