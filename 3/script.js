const imageList = document.getElementById('imageList');
const imageContainer = document.getElementById("imageContainer");
const images = imageContainer.querySelectorAll('img');


let selectedImage = '';

document.getElementById("hideAll").addEventListener("click", () =>{
    images.forEach(img => img.style.display = "none");
});

document.getElementById("showAll").addEventListener("click", () =>{
    images.forEach(img => img.style.display = "block");
});

imageList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        selectedImage = event.target.getAttribute('data-image');
        images.forEach(img => {
            img.style.display = img.src.includes(selectedImage) ? 'block' : 'none';
        });
    }
});

document.getElementById("addNewItem").addEventListener("click",() =>{
    const dataText = document.getElementById("newItemText").value;
    if(dataText !== ""){
        const newElement = document.createElement("li");

        selectedImage = "resource/default.jpg";

        newElement.setAttribute('data-image', 'resource/default.jpg');
        newElement.textContent = dataText;

        newElement.addEventListener("click", () =>{
            img.style.display = img.src.includes(selectedImage) ? 'block' : 'none';
        });

        imageList.insertBefore(newElement, imageList.querySelectorAll("li")[1]);
    
        document.getElementById('newItemText').value = '';
    }
});

document.getElementById('showInNewWindow').addEventListener('click', () => {
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    newWindow.document.write('<html><head><title>Галерея</title><style>img { display: inline-block; margin: 5px; border: 2px solid black; }</style></head><body>');
    if (selectedImage) {
        newWindow.document.write(`<img src="${selectedImage}" alt="Selected Image" style="width: 150px; height: 150px;">`);

    }
    images.forEach(img => {
        if (!selectedImage || !img.src.includes(selectedImage)) {
            newWindow.document.write(`<img src="${img.src}" alt="${img.alt}" style="width: 150px; height: 150px;">`);
        }
    });
    newWindow.document.write('</body></html>');
    newWindow.document.close();
});

document.getElementById('showAll').addEventListener('click', () => {
    images.forEach(img => img.style.display = 'block');
});
