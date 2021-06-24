//for type auto generation
function getAllTypes() {
  const url = `http://localhost:8080/Project_1/getAllType`;

  let selector = document.querySelector("#typeSelect");
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
        r.forEach((type) => {
          selector.options[selector.options.length] = new Option(
            type.type,
            type.typeId
          );
        });
      }
    }
  }
}

getAllTypes();