function editPitch(pitch) {
    let title = document.getElementById("title").value
    let completionDate = document.getElementById("completionDate").value
    let tagLine = document.getElementById('tagLine').value
    xhttp = new XMLHttpRequest()
    const url = "http://localhost:8080/Project_1/editPitch";

    let oldPitch = {
        title: pitch.title,
        completionDate: pitch.completionDate,
        tagLine: pitch.tagLine
    }
    console.log(oldPitch);
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    pitch.title = title;
    pitch.completionDate = completionDate;
    pitch.tagLine = tagLine;

    let editedFields = {};




    if (title != '' && completionDate != '' && tagLine != '') {
        if (oldPitch.title != pitch.title) {
            editedFields.title = pitch.title;
        }
        if (oldPitch.completionDate != pitch.completionDate) {
            editedFields.completionDate = pitch.completionDate;
        }
        if (oldPitch.tagLine != pitch.tagLine) {
            editedFields.tagLine = pitch.tagLine
        }

        pitch.description = pitch.description + `@Edited by: ${getCookie("firstName")} ID: ${getCookie("userId")}`+ "\n" + "******************************" + "\n" + "Old Fields: " + `${JSON.stringify(oldPitch)}` + "Edited Fields: " + `${JSON.stringify(editedFields)}`;
        let json = JSON.stringify(pitch);

        xhttp.send(json);
        // editAlert.setAttribute('hidden', true);
        window.location.reload();
    }

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