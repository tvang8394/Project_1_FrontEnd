function denyPitch(newPitch) {
  let editorType = getCookie("type")
  const url = "http://localhost:8080/Project_1/updatePitch";
  console.log(editorType)
  console.log(newPitch)
  xhttp = new XMLHttpRequest()


  switch (editorType) {
    case "Assistant": {
      xhttp.open("POST", url, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      pitch.assistantApproval = false;
      pitch.denied = true;
      let reasonDeny = document.getElementById("reasonDeny").value;
      let reasonAlert = document.getElementById("reasonDenyAlert");
      let pitchDescription = pitch.description;
      let firstName = getCookie("firstName");
      let type = getCookie("type");
      let userId = getCookie("userId");
      if (reasonDeny != "") {
        let template = `@NAME: ${firstName}, User ID: ${userId}, Editor Status: ${type}, ReasonDeny: ${reasonDeny} `
        let newPitchDes = pitchDescription + "\n****************************\n" + template;
        newPitch.description = newPitchDes;
        let jsonPitch = JSON.stringify(pitch);
        xhttp.send(jsonPitch);
        reasonAlert.setAttribute("hidden", true);
        window.location.reload();
      }
      break;
    }
    case "General Editor": {
      
      xhttp.open("POST", url, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      pitch.generalApproval = false;
      pitch.denied = true;
      let reasonDeny = document.getElementById("reasonDeny").value;
      let reasonAlert = document.getElementById("reasonDenyAlert");
      let pitchDescription = pitch.description;
      let firstName = getCookie("firstName");
      let type = getCookie("type");
      let userId = getCookie("userId");
      if (reasonDeny != "") {
        let template = `@NAME: ${firstName}, User ID: ${userId}, Editor Status: ${type}, ReasonDeny: ${reasonDeny} `
        let newPitchDes = pitchDescription + "\n****************************\n" + template;
        newPitch.description = newPitchDes;
        let jsonPitch = JSON.stringify(pitch);
        xhttp.send(jsonPitch);
        reasonAlert.setAttribute("hidden", true);
        window.location.reload();
        
      }
      break;
    }
    case "Senior Editor": {
      xhttp.open("POST", url, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      pitch.seniorApproval = false;
      pitch.denied = true;
      let reasonDeny = document.getElementById("reasonDeny").value;
      let reasonAlert = document.getElementById("reasonDenyAlert");
      let pitchDescription = pitch.description;
      let firstName = getCookie("firstName");
      let type = getCookie("type");
      let userId = getCookie("userId");
      if (reasonDeny != "") {
        let template = `@NAME: ${firstName}, User ID: ${userId}, Editor Status: ${type}, ReasonDeny: ${reasonDeny} `
        let newPitchDes = pitchDescription + "\n****************************\n" + template;
        newPitch.description = newPitchDes;
        let jsonPitch = JSON.stringify(pitch);
        xhttp.send(jsonPitch);
        reasonAlert.setAttribute("hidden", true);
        window.location.reload();
        
      }
      break;
    }
    default: {
      "You're not allowed to approve"
    }
  }
  // location.reload
}

function showReasonDenyTrue() {
  let btnDeny = document.getElementById("reasonDenyAlert");
  btnDeny.setAttribute("hidden", true);
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