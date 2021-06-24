function deletePitch(newPitch) {
    // pitchCurrent = JSON.stringify(pitchCurrent);
    const url = `http://localhost:8080/Project_1/deletePitch`;
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    console.log(newPitch)
    let json = JSON.stringify(newPitch);
    // console.log(json)
    xhttp.send(json);
    window.location.reload();
}