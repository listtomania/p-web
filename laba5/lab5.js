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
    history: JSON.parse(localStorage.getItem('History')) || [],
    
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
    
    addHistoryRecord: function(action, id) {
        const timestamp = new Date().toLocaleString();
        this.history.push({ action, id, timestamp });
        this.saveHistoryToStorage();
        this.renderHistory();
    },
    
    saveHistoryToStorage: function() {
        localStorage.setItem('History', JSON.stringify(this.history));
    },
    
    renderHistory: function() {
        const historyContainer = document.querySelector('.history');
        historyContainer.innerHTML = '<div class="formHeader"><text>История изменений</text></div>';
        
        const historyList = document.createElement('div');
        historyList.className = 'history-list';
        
        this.history.slice().reverse().forEach(record => {
            const recordElement = document.createElement('div');
            recordElement.className = 'history-record';
            
            let actionText = '';
            if (record.action === 'add') {
                actionText = `Добавлен курс с ID: ${record.id}`;
            } else if (record.action === 'delete') {
                actionText = `Удалён курс с ID: ${record.id}`;
            }
            
            recordElement.textContent = `${record.timestamp} - ${actionText}`;
            historyList.appendChild(recordElement);
        });
        
        historyContainer.appendChild(historyList);
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
    document.querySelector('result1').textContent = '';
    document.querySelector('result2').textContent = '';
}

function handleAddElement(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const faculty = document.getElementById('faculty').value;
    const numberOfStudents = document.getElementById('numberOfStudents').value;
    const email = document.getElementById('email').value;
    const phoneNumber = newCharacteristicValue;

    document.querySelector('result1').textContent = '';
    document.querySelector('result2').textContent = '';

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

    const newId = Service.getNextID();
    Service.addElement(name, faculty, numberOfStudents, email, phoneNumber);
    Service.addHistoryRecord('add', newId);
    renderResultsTable();
    addIDToDelete();
    delForm();
}

var flag = 1;
function addNewPlace(event) {
    event.preventDefault();
    if (flag) {
        const newPlace = document.createElement('label');
        newPlace.textContent = 'Номер телефона: ';
        const newPlaceText = document.createElement('input');
        newPlaceText.className = 'input';
        newPlaceText.type = 'tel';
        newPlaceText.pattern = "\\d{2}-\\d{4}-\\d{2}";
        newPlaceText.placeholder = 'XX-XXXX-XX';
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
    if (isNaN(ID)) return;
    
    Service.deleteElementById(ID);
    Service.addHistoryRecord('delete', ID);
    renderResultsTable();
    addIDToDelete();
}

function renderResultsTable() {
    const tableBody = document.getElementById('data-table');
    tableBody.innerHTML = '';
    
    const thead = document.querySelector('.results-table thead tr');
    thead.innerHTML = '';
    
    if (Service.data.length === 0) return;
    
    const headers = Object.keys(Service.data[0]);
    headers.forEach(header => {
        if (header !== 'phoneNumber') { 
            const th = document.createElement('th');
            th.textContent = header;
            thead.appendChild(th);
        }
    });
    
    Service.data.forEach(item => {
        const row = document.createElement('tr');
        
        headers.forEach(header => {
            if (header !== 'phoneNumber') { 
                const cell = document.createElement('td');
                cell.textContent = item[header];
                row.appendChild(cell);
            }
        });
        
        tableBody.appendChild(row);
    });
}

function addIDToDelete() {
    const select = document.getElementById('delID');
    select.innerHTML = '<option></option>';
    
    Service.data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.ID;
        option.textContent = item.ID;
        select.appendChild(option);
    });
}

function handleSortFornumberOfStudents(event) {
    event.preventDefault();
    Service.data.sort((a, b) => parseInt(a.numberOfStudents) - parseInt(b.numberOfStudents));
    renderResultsTable();
}

function handleReturnToOriginalState(event) {
    event.preventDefault();
    Service.data.sort((a, b) => a.ID - b.ID);
    renderResultsTable();
}

document.addEventListener('DOMContentLoaded', function() {
    renderResultsTable();
    addIDToDelete();
    Service.renderHistory();
});