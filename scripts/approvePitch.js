function approvePitch(newPitch) {
  let editorType = getCookie("type")
  const url = "http://localhost:8080/Project_1/updatePitch";
  console.log(editorType)
  console.log(newPitch)
  xhttp = new XMLHttpRequest()


  switch (editorType) {
    case "Assistant": {
      xhttp.open("POST", url, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      console.log(newPitch)
      newPitch.assistantApproval = true;
      let update = JSON.stringify(newPitch);
      console.log(update);
      xhttp.send(update);
      window.location.reload();
      break;

    }
    case "General Editor": {
      xhttp.open("POST", url, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      console.log(newPitch)
      newPitch.generalApproval = true;
      let update = JSON.stringify(newPitch);
      console.log(update);
      xhttp.send(update);
      window.location.reload();
      break;
    }
    case "Senior Editor": {
      xhttp.open("POST", url, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      console.log(newPitch)
      newPitch.seniorApproval = true;
      let update = JSON.stringify(newPitch);
      console.log(update);
      xhttp.send(update);
      window.location.reload();
      break;
    }
    default: {
      "You're not allowed to approve"
    }
  }
  // location.reload();
}

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