let dataProducts;
fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(dataResponse => {
        if (localStorage.getItem("dataProducts") !== null) {
            dataProducts = JSON.parse(localStorage.getItem("dataProducts"))
        } else {
            const { products } = dataResponse;
            dataProducts = products
            localStorage.setItem("dataProducts", JSON.stringify(dataProducts))
        }
        displayList(dataProducts);

    }

    );
let exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', function (event) {
    let button = event.relatedTarget
    let price = button.getAttribute('price')
    let category = button.getAttribute('category')
    let rating = button.getAttribute('rating')
    let name = button.getAttribute('name')

    let modalTitle = exampleModal.querySelector('.modal-title')
    let modalBody = exampleModal.querySelector('.modal-body')

    modalTitle.textContent = name
    modalBody.innerHTML = `
    <p>Price: ${price}</p>
    <p>Category: ${category}</p>
    <p>Rating: ${rating}</p>
  `;
})
document.getElementById('searchInput').addEventListener('input', function () {
    clearContainer()
    const searchTerm = this.value;
    if (searchTerm === "") {
        displayList(dataProducts);
    }else {
        const results = searchByName(searchTerm, dataProducts);
    displayList(results);
    }
    
});
function searchByName(name, items) {
    return items.filter(item => item.title.toLowerCase().includes(name.toLowerCase()));
}
const displayList = (list) => {
    for (let i = 0; i < list.length; i++) {
        const { images: [imgUrl], title, description, price, category, rating } = list[i];
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = imgUrl;
        img.className = 'card-img-top';
        img.alt = '...';
        card.appendChild(img);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        card.appendChild(cardBody);

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = title;
        cardBody.appendChild(cardTitle);

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = description;
        cardBody.appendChild(cardText);

        const button = document.createElement('button');
        button.type = "button";
        button.className = "btn btn-primary";
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#exampleModal');
        button.setAttribute('price', price);
        button.setAttribute('category', category);
        button.setAttribute('rating', rating);
        button.setAttribute('name', title);
        button.textContent = 'Details';
        cardBody.appendChild(button);

        document.getElementById('cards-container').appendChild(card);

    }
}
const clearContainer = () => {
    document.querySelectorAll(".card").forEach((element) => {
        element.remove()
    }
    )
}