document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("Description");
  const brandInput = document.getElementById("Brand");
  const imageInput = document.getElementById("Image");
  const priceInput = document.getElementById("Price");

  const form = document.getElementById("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newProduct = {
      name: nameInput.value,
      brand: brandInput.value,
      description: descriptionInput.value,
      imageUrl: imageInput.value,
      price: priceInput.value,
    };

    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmY1MzE4N2U1YzAwMTgxNGM1ZjUiLCJpYXQiOjE3MDU2NTIwNTEsImV4cCI6MTcwNjg2MTY1MX0.eGwcXG-cMCFgVBuydgYKbuQOCREYKHIGB9F6DqFZyXc",
      },
    })
      .then((response) => {
        if (response.ok) {
          form.reset();
          return response.json();
        } else {
          throw new Error(
            `Errore nella risposta della richiesta API: ${response.status}`
          );
        }
      })
      .then((data) => {
        console.log("Dati della risposta:", data);
      })
      .catch((error) => {
        console.error("Errore durante la chiamata API:", error);
      });
  });
});
