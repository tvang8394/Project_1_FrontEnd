function login() {
  let username = document.getElementById("inputUsername").value;
  let password = document.getElementById("inputPassword").value;

  const url = "http://localhost:8080/Project_1/login";
  let xhttp = new XMLHttpRequest();

  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  if (username != "" && password != "") {
    let body = {
      userName: username,
      password: password,
    };

    body = JSON.stringify(body);
    xhttp.send(body);
    xhttp.onreadystatechange = recieveData;
    function recieveData() {
      if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
          let r = xhttp.responseText;
          r = JSON.parse(r);
          console.log(r);
          if (r.userName == username && r.password == password) {
            document.cookie = `userId=${r.userId};`
            document.cookie = `type=${r.type}`
            document.cookie = `firstName=${r.firstName}`
            document.cookie = `genre=${r.genre.genre}`
            window.location.href = "http://127.0.0.1:5500/html/dashboard.html?";
          }
        }
      }
    }
  }
}

function getUser() {
  const url = "http://localhost:8080/Project_1/getUserById";

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
      }
    }
  }
}

function createPitch() {
  const url = "http://localhost:8080/Project_1/createPitch";
  var xhttp = new XMLHttpRequest();
  let title = document.getElementById("title").value;

  let completionDate = document.getElementById("completionDate").value;
  let tagLine = document.getElementById("tagLine").value;
  let storyTypeSelect = document.querySelector("#typeSelect");
  let storyType = storyTypeSelect.options[storyTypeSelect.selectedIndex].text;
  let genreSelect = document.querySelector("#genreSelect");
  let genreValue = genreSelect.options[genreSelect.selectedIndex].text;
  let description = document.getElementById("description").value;

  let genre = {
    genreId: genreSelect.value,
    genre: genreValue,
  };

  let type = {
    typeId: storyTypeSelect.value,
    type: storyType,
  };

  let score = getCookie("score");

  if (title != "" && completionDate != "" && tagLine != "") {
    let userId = {
      userId: parseInt(getCookie("userId"))
    }

    let body = {
      userId: userId,
      title: title,
      completionDate: completionDate,
      storyType: type,
      genre: genre,
      tagLine: tagLine,
      description: description
    };
    
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    body = JSON.stringify(body);
    if (score >= 100) {
      let scoreAlert = document.getElementById("scoreAlert")
      scoreAlert.removeAttribute("hidden")
      setTimeout(() => {
        scoreAlert.setAttribute("hidden", true);
      }, 2000);
      //add save function here when you can.
    } else {
      xhttp.send(body);
      xhttp.onreadystatechange = recieveData;
    }


    function recieveData() {
      if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
          let pitch = xhttp.responseText;
          console.log(pitch)
        }
      }
    }
    let pitchAlert = document.getElementById("pitchAlert")
    pitchAlert.removeAttribute("hidden")
    setTimeout(() => {
      
      window.location.href = "http://127.0.0.1:5500/html/dashboard.html?";

    }, 2000);
  }
}

function createUser() {
  const url = "http://localhost:8080/Project_1/createUser";
  var xhttp = new XMLHttpRequest();

  let firstName = document.getElementById("firstNameInput").value;
  let lastName = document.getElementById("lastNameInput").value;
  let selector = document.getElementById("type");
  let userType = selector.options[selector.selectedIndex].text;

  let genreSelect = document.querySelector("#genreSelect");
  let genreValue = genreSelect.options[genreSelect.selectedIndex].text;
  let genre = {
    genreId: document.querySelector("#genreSelect").value,
    genre: genreValue,
  };

  //   let genre = genreSelect.options[genreSelect.selectedIndex].text;
  let username = document.getElementById("inputUsername").value;
  let password = document.getElementById("inputPassword").value;

  if (
    firstName != "" &&
    lastName != "" &&
    userType != "" &&
    genre != "" &&
    username != "" &&
    password != ""
  ) {
    let body = {
      firstName: firstName,
      lastName: lastName,
      userName: username,
      password: password,
      type: userType,
      genre: genre,
    };
    console.log(body);
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    if (xhttp.readyState == 4) {
      if (xhttp.status == 200) {
        alert(xhttp.responseText);
      }
    }
    body = JSON.stringify(body);
    // console.log(body);
    xhttp.send(body);
    let successAlert = document.getElementById("successAlert");
    successAlert.innerText = `User ${username} has been creted!`
    successAlert.removeAttribute("hidden")
    setTimeout(() => {
      window.location.href = "http://127.0.0.1:5500/html/index.html?";

    }, 2000);
  }
}

(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

if (getCookie("firstName") != null) {
  let insertName = document.getElementById("insertName");
  let h6 = document.createElement("h6")
  let firstName = getCookie("firstName")
  console.log(firstName);
  h6.innerText = `Hello  ${firstName}`;
  insertName.appendChild(h6);
}