const URL = "https://striveschool-api.herokuapp.com/api/product/";

const params = new URLSearchParams(window.location.search);
const id = params.get("productId");

window.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

const fetchData = () => {
    isLoading(true);
    fetch(URL + id, {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDc4NDBkOGEyMDAwMThhNDhhNjEiLCJpYXQiOjE3MDE5NTk1NTYsImV4cCI6MTcwMzE2OTE1Nn0.Bij2n846IV3HDwW9PJWea_KAmUMF1wD-sUZ-cShxMp4",
        },
    })
        .then((resp) => {
            if (!resp.ok) {
                statusErrors(resp);
            }
            return resp.json();
        })
        .then((productObj) => {
            console.log(productObj);
            createObjDetails(productObj);
        })
        .finally(() => {
            isLoading(false);
        })
        .catch((error) => {
            console.log("ERROR", error);
        });
};

function createObjDetails(myObj) {
    const { brand, createdAt, description, imageUrl, name, price, _id, updatedAt } = myObj;
    const rowColsContainer = document.getElementById("rowColsContainer");
    const col1 = document.createElement("div");
    col1.className = "col-8 d-flex flex-column align-items-start";
    const h2BrandName = document.createElement("h2");
    h2BrandName.className = "display-4 my-4 mt-0";
    h2BrandName.innerText = `${brand}`;
    col1.appendChild(h2BrandName);
    const pProductName = document.createElement("p");
    pProductName.className = "fst-italic fs-4";
    pProductName.innerText = `${name}`;
    const spanDescription = document.createElement("span");
    spanDescription.className = "fs-6";
    spanDescription.innerHTML = `<br>${description}`;
    const pPrice = document.createElement("p");
    pPrice.className = "fw-normal fs-4";
    pPrice.innerHTML = `<span>Prezzo:<span> ${price}€`;
    pProductName.appendChild(spanDescription);
    col1.appendChild(pProductName);
    col1.appendChild(pPrice);
    const col2 = document.createElement("div");
    col2.className = "col-4 d-flex align-items-center";
    const divImgContainer = document.createElement("div");
    divImgContainer.className = "container-fluid";
    const productImg = document.createElement("img");
    productImg.className = "img-fluid rounded-2";
    productImg.src = `${imageUrl}`;
    divImgContainer.appendChild(productImg);
    col2.appendChild(divImgContainer);

    rowColsContainer.appendChild(col1);
    rowColsContainer.appendChild(col2);
    const linkToEditContainer = document.getElementById("linkToEditContainer");
    linkToEditContainer.innerHTML = `<a class="btn btn-primary rounded-4" href="./backoffice.html?productId=${_id}">Modifica prodotto</a>`;
}

function isLoading(boolean) {
    const spinner = document.querySelector(".spinner-border");
    if (boolean) {
        spinner.classList.remove("d-none");
    } else {
        spinner.classList.add("d-none");
    }
}
