
//for genre auto generation
const url = `http://localhost:8080/Project_1/getAllGenre`;

let selector = document.querySelector("#genreSelect");
let opt = document.createElement("option");
console.log(selector);
let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = recieveData;

xhttp.open("GET", url, true);
//   xhttp.setRequestHeader("Origin", "http://127.0.0.1:5500");

xhttp.send();

function recieveData() {
  if (xhttp.readyState == 4) {
    if (xhttp.status == 200) {
      let r = xhttp.responseText;
      r = JSON.parse(r);

      console.log(r);
      r.forEach((genre) => {
          console.log(genre)
        selector.options[selector.options.length] = new Option(
          genre.genre,
          genre.genreId
        );
      });
    }
  }
}

