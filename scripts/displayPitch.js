
const url = `http://localhost:8080/Project_1/getAllPitch`;


let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = recieveData;

xhttp.open("GET", url, true);
//   xhttp.setRequestHeader("Origin", "http://127.0.0.1:5500");

xhttp.send();

function recieveData() {
  if (xhttp.readyState == 4) {
    if (xhttp.status == 200) {
      let r = xhttp.responseText;
      r = JSON.parse(r)
      let userId = getCookie("userId")
      let type = getCookie("type");
      let genre = getCookie("genre")
      let score = 0;

      for (pitch of r) {
        if (pitch.userId.userId == userId || type != "Author") {
          let assistantApproval = pitch.assistantApproval
          let generalApproval = pitch.generalApproval
          let seniorApproval = pitch.seniorApproval;
          console.log(generalApproval)
          //all pitch for assistants

          if (pitch.userId.userId == userId) {

            createCard(pitch)

            score = score + pitch.storyType.points;
            document.cookie = `score=${score}`
          }

          else if (assistantApproval == false && (type == "Assistant" && pitch.genre.genre == genre)) {
            if (pitch.denied == false) {
              createCard(pitch)

            }
          }
          //all pitch for genreal
          else if (assistantApproval && generalApproval == false && ((type == "General Editor" && genre != pitch.genre.genre))) {
            if (pitch.denied == false) {
              createCard(pitch)

            }
          }
          else if (generalApproval && seniorApproval == false && ((type == "Senior Editor" && genre == pitch.genre.genre))) {
            if (pitch.denied == false) {
              createCard(pitch)
            }
          }
        }
      }
    }
  }
}




function showReasonDeny() {
  let btnDeny = document.getElementById("reasonDenyAlert");
  btnDeny.removeAttribute("hidden")
}

function createCard(pitch) {
  let type = getCookie("type");

  let customCards = document.getElementById("custom-cards");
  let firstDiv = document.createElement("div");
  let secondDiv = document.createElement("div");
  let thirdDiv = document.createElement("div");
  let h5 = document.createElement("h5");
  let fourthDiv = document.createElement("div");
  let h6 = document.createElement("h6")
  let author = document.createElement('p')
  let tagLine = document.createElement('p')
  let completionDate = document.createElement('p')
  let storyType = document.createElement('p')
  let genre = document.createElement('p')

  let fifthDiv = document.createElement("div")
  let approveBtn = document.createElement("button")
  let denyBtn = document.createElement("button")
  let moreBtn = document.createElement("button")
  let deleteBtn = document.createElement("button")
  let deny = document.getElementById("deny");
  //modal
  let modalBody = document.getElementById("modal-body")
  let approvalStatus = document.getElementById("approvalStats")
  let deniedBadge = document.createElement("span");
  let successBadge = document.createElement("span");
  let highPriority = document.createElement("span");
  let editButton = document.createElement("span");
  let updateBtn = document.getElementById("updateBtn");
  let closeEdit = document.getElementById("closeEdit");
  let uploadBtn = document.createElement("button");
  
  let year = pitch.completionDate.split('-')
  console.log(pitch.completionDate)
  console.log(year)
  let today = new Date();

  uploadBtn.classList.add("btn", "btn-success")
  editButton.classList.add("glyphicon", "glyphicon-pencil", "btn", "btn-warning", "col-2");
  deniedBadge.classList.add("badge", "rounded-pill", "bg-danger")
  successBadge.classList.add("badge", "rounded-pill", "bg-success")
  highPriority.classList.add("badge", "rounded-pill", "bg-success")
  moreBtn.classList.add("btn", "btn-primary", "g-2")
  approveBtn.classList.add("btn", "btn-success")
  approveBtn.setAttribute("type", "button")
  approveBtn.addEventListener("click", function () {
    approvePitch(pitch)
  })
  denyBtn.classList.add("btn", "btn-danger")
  deleteBtn.classList.add("btn", "btn-info")


  updateBtn.setAttribute("type", "button")
  moreBtn.setAttribute("type", "button")
  moreBtn.setAttribute("data-bs-toggle", "modal")
  moreBtn.setAttribute("data-bs-target", "#exampleModal")

  denyBtn.setAttribute("type", "button")
  denyBtn.setAttribute("id", "denyBtn")
  denyBtn.setAttribute("onclick", "showReasonDeny()")
  deny.addEventListener("click", function () { denyPitch(pitch) })
  deleteBtn.setAttribute("type", "button")
  deleteBtn.addEventListener("click", function () { deletePitch(pitch) })
  fifthDiv.classList.add("text-center")

  editButton.addEventListener("click", function () {
    let title = document.getElementById("title")
    let completionDate = document.getElementById("completionDate")
    let tagLine = document.getElementById('tagLine')

    title.value = pitch.title;
    completionDate.value = pitch.completionDate;
    tagLine.value = pitch.tagLine;
    let editAlert = document.getElementById("editAlert");
    editAlert.removeAttribute("hidden");

  })
  closeEdit.addEventListener("click", function () {
    let editAlert = document.getElementById("editAlert");
    editAlert.setAttribute("hidden", true);
  })
  updateBtn.addEventListener("click", function () {
    editPitch(pitch)
  })
  author.classList.add("card-text")
  tagLine.classList.add("card-text")
  completionDate.classList.add("card-text")
  storyType.classList.add("card-text")
  genre.classList.add("card-text")





  h6.classList.add("cardTitle")
  fourthDiv.classList.add("card-body");

  thirdDiv.classList.add("card", "card-cover", "h-100", "overflow-hidden", "text-white", "bg-dark", "rounded-5", "shadow-lg")
  secondDiv.classList.add("col");
  secondDiv.setAttribute("id", `${pitch.pitchId}`)
  h5.classList.add("card-header")
  h5.innerText = `Title: ${pitch.title}`
  author.innerText = `Author: ${pitch.userId.firstName}`
  tagLine.innerText = `Tag Line: ${pitch.tagLine}`
  completionDate.innerText = `Complete Date: ${pitch.completionDate}`
  storyType.innerText = `Story Type: ${pitch.storyType.type}`
  genre.innerText = `Genre: ${pitch.genre.genre}`
  modalBody.innerText = `Description: ${pitch.description}`
  approvalStatus.innerText = `Approvals: Assistant: ${pitch.assistantApproval}, General: ${pitch.generalApproval}, Senior: ${pitch.seniorApproval}`
  approveBtn.innerText = "Approve";
  denyBtn.innerText = "Deny"
  moreBtn.innerText = "More Info"
  deleteBtn.innerText = "Delete Pitch"
  deniedBadge.innerText = "Status: Denied (refer to More Info)";
  successBadge.innerText = "Status: Approved";
  highPriority.innerText = "Status: HIGH PRIORITY";
  editButton.innerText = "Edit"
  uploadBtn.innerText = "Upload Final Pitch"
  customCards.appendChild(secondDiv);
  secondDiv.appendChild(thirdDiv);
  thirdDiv.appendChild(h5)

  if (pitch.denied != false) {
    thirdDiv.appendChild(deniedBadge)
  }
  let daysLeft;
  let highPriorityBool = false;
  if (type != "Author") {
    if (parseInt(year[0]) == today.getFullYear()) {
      console.log(year[0])
      if (parseInt(year[1]) == today.getMonth()) {
        console.log(year[1])
        daysLeft = today.getDate() -year[2]
        
      } else {
        daysLeft = (30 - today.getDate()) + parseInt(year[2])
        // highPriority = false;

      }

    }
  }

  if (type != "Author" && type == "Assistant") {
    if (daysLeft <= 10)  {
      thirdDiv.appendChild(highPriority)
      fifthDiv.appendChild(approveBtn)
      fifthDiv.appendChild(denyBtn)
      fifthDiv.appendChild(moreBtn)
      fifthDiv.appendChild(editButton)
      approveBtn.addEventListener("click", function() {highPriorityBool = false})
    } else if ((daysLeft > 10) && highPriorityBool ==false) {
      fifthDiv.appendChild(approveBtn)
      fifthDiv.appendChild(denyBtn)
      fifthDiv.appendChild(moreBtn)
      fifthDiv.appendChild(editButton)
    } else if (highPriorityBool == false) {
      fifthDiv.appendChild(moreBtn)
      
      
    }else {
      fifthDiv.appendChild(moreBtn)
      
    }
    
  }

  if (type != "Author") {
    if (daysLeft <= 10)  {
      thirdDiv.appendChild(highPriority)
      fifthDiv.appendChild(approveBtn)
      fifthDiv.appendChild(denyBtn)
      fifthDiv.appendChild(moreBtn)
      fifthDiv.appendChild(editButton)
      approveBtn.addEventListener("click", function() {highPriorityBool = false})
    } else if ((daysLeft > 10) && highPriorityBool ==false) {
      fifthDiv.appendChild(approveBtn)
      fifthDiv.appendChild(denyBtn)
      fifthDiv.appendChild(moreBtn)
      fifthDiv.appendChild(editButton)
    } else if (highPriorityBool == false) {
      fifthDiv.appendChild(moreBtn)
    }else {
      fifthDiv.appendChild(moreBtn)
    }

    
  }
  if (type == "Author"){
    let splitter = pitch.description
    splitter = splitter.search("@");
    if(splitter > 1) {
      fifthDiv.appendChild(approveBtn);
    }
    
    fifthDiv.appendChild(moreBtn)
    fifthDiv.appendChild(deleteBtn)
  }
  
  if (pitch.denied == false && pitch.assistantApproval && pitch.generalApproval && pitch.seniorApproval) {
    thirdDiv.appendChild(successBadge)
    fifthDiv.appendChild(uploadBtn)
    let uploadAlert = document.getElementById("uploadAlert")
    uploadBtn.addEventListener("click", function() {
      uploadAlert.removeAttribute("hidden");
    })
    let closeAlert = document.getElementById("closeUploadAlert");
    closeAlert.addEventListener("click", function() {
      uploadAlert.setAttribute("hidden", true)
    })
  }
  thirdDiv.appendChild(fourthDiv)
  fourthDiv.appendChild(author)
  fourthDiv.appendChild(tagLine)
  fourthDiv.appendChild(completionDate)
  fourthDiv.appendChild(storyType)
  fourthDiv.appendChild(genre)
  fourthDiv.appendChild(fifthDiv)


  


}



function displayCreatePitchButton() {
  let creatPitchBtn = document.getElementById("pitchBtn");
  let type = getCookie("type");
  if (type == "Author") {
    creatPitchBtn.removeAttribute("hidden");
  }

}

displayCreatePitchButton();

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