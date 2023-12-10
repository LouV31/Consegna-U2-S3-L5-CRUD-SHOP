const URL = "https://striveschool-api.herokuapp.com/api/product/";

window.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

const fetchData = () => {
    isLoading(true);
    fetch(URL, {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDc4NDBkOGEyMDAwMThhNDhhNjEiLCJpYXQiOjE3MDE5NTk1NTYsImV4cCI6MTcwMzE2OTE1Nn0.Bij2n846IV3HDwW9PJWea_KAmUMF1wD-sUZ-cShxMp4",
        },
    })
        .then((resp) => {
            console.log(resp);
            if (!resp.ok) {
                statusErrors(resp);
            }
            return resp.json();
        })

        .then((products) => {
            console.log(products);
            products.forEach((product) => {
                createMainProduct(product);
                crerateProductCards(product);
            });
        })
        .finally(() => {
            isLoading(false);
        })
        .catch((error) => {
            console.log("Error ", error);
        });
};

function createMainProduct(product) {
    const mainProductContainer = document.getElementById("mainProductContainer");
    const mainProduct = document.getElementById("mainProduct");
    if (product.name === "Apple Iphone 15 PRO MAX") {
        const mainProductImg = document.createElement("img");
        mainProductImg.className = "img-fluid rounded-2";
        mainProductImg.src = `${product.imageUrl}`;
        const mainProductPrice = document.getElementById("mainProductPrice");
        mainProductPrice.innerHTML = `${product.price}€`;
        mainProduct.appendChild(mainProductImg);
        const mainProductDetails = document.createElement("a");
        mainProductDetails.innerText = "scopri";
        mainProductDetails.className = "btn btn-dark";
        mainProductDetails.href = `./details.html?productId=${product._id}`;
        mainProductContainer.appendChild(mainProductDetails);
    }
}

function crerateProductCards(product) {
    const rowColsContainer = document.getElementById("rowColsContainer");
    const col = document.createElement("div");
    col.className = "col gy-3";
    const card = document.createElement("div");
    card.className = "card overflow-hidden";
    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top img-fluid object-fit-contain";
    cardImg.style.maxHeight = "250px";
    cardImg.src = `${product.imageUrl}`;
    card.appendChild(cardImg);
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.innerHTML = `
        <h5 class="card-title display-6 fw-bold">${product.brand}</h5>
        <h6 class="fw-semibold">${product.name}</h6> 
        <p class="card-text">Prezzo: <span>${product.price}€</span></p>
        <a href="./backoffice.html?productId=${product._id}" class="btn btn-primary mb-1">Modifica</a>
        <a href="./details.html?productId=${product._id}" class="btn btn-dark">Scopri</a>
    `;
    card.appendChild(cardBody);
    col.appendChild(card);
    rowColsContainer.appendChild(col);
}

function isLoading(boolean) {
    const spinner = document.querySelector(".spinner-border");
    if (boolean) {
        spinner.classList.remove("d-none");
    } else {
        spinner.classList.add("d-none");
    }
}
