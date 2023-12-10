const params = new URLSearchParams(window.location.search);
const id = params.get("productId");
const URL = id
    ? "https://striveschool-api.herokuapp.com/api/product/" + id
    : "https://striveschool-api.herokuapp.com/api/product/";

const method = id ? "PUT" : "POST";

window.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submitBtn");
    const deleteBtn = document.getElementById("deleteBtn");
    const subtitle = document.getElementById("subtitle");
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        generateNewProduct();
        form.reset();
    });
    deleteBtn.addEventListener("click", deleteProduct);
    uploadImg();
    if (id) {
        subtitle.innerText = "Modifica Prodotto";
        subtitle.className = "text-white";
        deleteBtn.classList.remove("d-none");
        isLoading(true);

        fetch(URL, {
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
                getBackInfoProduct(productObj);
            })
            .finally(() => {
                isLoading(false);
            });
    } else {
        subtitle.innerText = "Crea Prodotto";
        subtitle.className = "text-white";
        submitBtn.innerText = "Aggiungi";
    }
});

function generateNewProduct() {
    const newProduct = {
        brand: document.getElementById("brand").value,
        name: document.getElementById("productName").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        imageUrl: document.getElementById("imageUrl").value,
    };
    isLoading(true);
    fetch(URL, {
        method: method,
        body: JSON.stringify(newProduct),
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDc4NDBkOGEyMDAwMThhNDhhNjEiLCJpYXQiOjE3MDE5NTk1NTYsImV4cCI6MTcwMzE2OTE1Nn0.Bij2n846IV3HDwW9PJWea_KAmUMF1wD-sUZ-cShxMp4",
        },
    })
        .then((resp) => {
            if (!resp.ok) {
                statusErrors(resp);
            }
            console.log("prova");
            return resp.json();
        })
        .then((productObj) => {
            console.log(productObj);
            if (id) {
                showAlert("Prodotto con id: " + productObj._id + "modificato con successo!");
            } else {
                showAlert("Prodotto con id: " + productObj._id + "creato con successo!");
            }
        })
        .finally(() => {
            isLoading(false);
        })
        .catch((error) => {
            console.log("ERROR", error);
        });
}

function deleteProduct() {
    const hasConfirmed = confirm("Azione irreversibile, vuoi procedere?");

    if (hasConfirmed) {
        isLoading(true);
        fetch(URL, {
            method: "DELETE",
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
            .then((deletedObj) => {
                showAlert("Hai eliminato il seguente prodotto: " + deletedObj.name + " id: " + deletedObj._id);
                setTimeout(() => {
                    window.location.assign("./index.html");
                }, 3000);
            })
            .finally(() => {
                isLoading(false);
            })
            .catch((err) => {
                console.log("ERROR: ", err);
            });
    }
}

function getBackInfoProduct(myObj) {
    const { brand, description, imageUrl, name, price, _id } = myObj;

    document.getElementById("brand").value = brand;
    document.getElementById("productName").value = name;
    document.getElementById("description").value = description;
    document.getElementById("price").value = `${price}`;
    document.getElementById("imageUrl").value = imageUrl;
    document.getElementById(
        "uploadedImgContainer"
    ).innerHTML = `<img class="img-fluid" style="max-height: 530px " src="${imageUrl}"/>`;
}

function uploadImg() {
    const uploadBtn = document.getElementById("uploadBtn");
    uploadBtn.addEventListener("click", function () {
        const url = document.getElementById("imageUrl").value;
        const uploadedImgContainer = document.getElementById("uploadedImgContainer");
        const myImg = document.createElement("img");
        myImg.className = "img-fluid";
        myImg.style.maxHeight = "530px";
        myImg.src = url;
        uploadedImgContainer.innerHTML = "";
        uploadedImgContainer.appendChild(myImg);
    });
}

function showAlert(message, color = "success") {
    const myAlert = document.getElementById("myAlert");
    myAlert.innerHTML = `<div class="alert alert-${color}" role="alert">${message}</div>`;

    setTimeout(() => {
        myAlert.innerHTML = "";
    }, 3000);
}

function isLoading(boolean) {
    const spinner = document.querySelector(".spinner-border");
    if (boolean) {
        spinner.classList.remove("d-none");
    } else {
        spinner.classList.add("d-none");
    }
}
