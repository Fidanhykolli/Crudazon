const addCards = (allTheProducts) => {
  const container = document.getElementById("products-container");

  allTheProducts.forEach((cards) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const card = document.createElement("div");
    card.className = "card mb-4 me-5 mt-4";

    const cardImg = document.createElement("img");
    cardImg.src = cards.imageUrl;
    cardImg.className = "card-img-top";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = cards.name;

    const description = document.createElement("p");
    description.className = "card-text";
    description.textContent = cards.description;

    const brand = document.createElement("p");
    brand.className = "card-text";
    brand.textContent = cards.brand;

    const price = document.createElement("p");
    price.className = "card-text";
    price.textContent = `$ ${cards.price}`;

    console.log(cards);

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "ELIMINA";
    deleteButton.addEventListener("click", () => {
      fetch(`https://striveschool-api.herokuapp.com/api/product/${cards._id}`, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmY1MzE4N2U1YzAwMTgxNGM1ZjUiLCJpYXQiOjE3MDU2NTIwNTEsImV4cCI6MTcwNjg2MTY1MX0.eGwcXG-cMCFgVBuydgYKbuQOCREYKHIGB9F6DqFZyXc",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Errore nella risposta della richiesta API: ${response.status}`
            );
          }
          container.removeChild(col);
        })
        .catch((error) => {
          console.error("Errore durante la chiamata API:", error);
        });
    });

    const modifyButton = document.createElement("button");
    modifyButton.className = "btn bg-secondary text-white ms-2";
    modifyButton.textContent = "MODIFICA";
    modifyButton.addEventListener("click", () => {
      sessionStorage.setItem("selectedCardId", cards._id);
      window.open("details.html", "_blank");
    });

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(brand);
    cardBody.appendChild(price);
    cardBody.appendChild(deleteButton);
    cardBody.appendChild(modifyButton);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    col.appendChild(card);
    container.appendChild(col);
  });
};

fetch("https://striveschool-api.herokuapp.com/api/product/", {
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmY1MzE4N2U1YzAwMTgxNGM1ZjUiLCJpYXQiOjE3MDU2NTIwNTEsImV4cCI6MTcwNjg2MTY1MX0.eGwcXG-cMCFgVBuydgYKbuQOCREYKHIGB9F6DqFZyXc",
  },
})
  .then((response) => response.json())
  .then((data) => {
    addCards(data);
  })
  .catch((error) => {
    console.error("Errore durante la chiamata API:", error);
  });
