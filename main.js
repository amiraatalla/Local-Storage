var txtID = document.getElementById("txtID");
var txtFullName = document.getElementById("txtFullName");
var txtEmail = document.getElementById("txtEmail");
var txtPhone = document.getElementById("txtPhone");
var txtAge = document.getElementById("txtAge");

var userArr=[];

window.addEventListener('load',function(){
  var currentUserObject = JSON.parse(localStorage.getItem("userList"));
  for(var temp=0; temp<currentUserObject.length; temp++){
    var userObject = {
      ID: currentUserObject[temp]["ID"],
      "Full Name": currentUserObject[temp]["Full Name"],
      Email: currentUserObject[temp]["Email"],
      Telephone: currentUserObject[temp]["Telephone"],
      Age: currentUserObject[temp]["Age"]
    };
    userArr.push(userObject);
  }

});
document.getElementById("btnAdd").onclick = function () {
  if (validate()) {
    if (localStorage.length == 0) {
      userArr = [];
    }
    if (uniqueID()) {
      var userObject = {
        ID: txtID.value,
        "Full Name": txtFullName.value,
        Email: txtEmail.value,
        Telephone: txtPhone.value,
        Age: txtAge.value,
      };

      userArr.push(userObject);

      /*       var randomNumber = Math.floor(Math.random() * 10) + 1;
      newKey = txtID.value + txtFullName.value + randomNumber;
 */

      localStorage.setItem("userList", JSON.stringify(userArr));
    }
    //console.log(localStorage.key(0));
  } else {
    alert("Please fill all information");
  }
};

function validate() {
  let validate = true;

  if (txtID.value == "") {
    validate = false;
  }
  if (txtFullName.value == "") {
    validate = false;
  }
  if (txtEmail.value == "") {
    validate = false;
  }
  if (txtPhone.value == "") {
    validate = false;
  }
  if (txtAge.value == "") {
    validate = false;
  }

  return validate;
}

function uniqueID() {
  let unique = true;
  var re = new RegExp("^([0-9]{3}-[0-9]{7})$");
  var currentUserObject = JSON.parse(localStorage.getItem("userList"));

  if (localStorage.length >= 0) {
    if (currentUserObject == null) {
      unique = true;
    } else {
      for (var temp = 0; temp < currentUserObject.length; temp++) {
        if (txtID.value == currentUserObject[temp]["ID"]) {
          alert("ID already exists, Enter another ID");
          unique = false;
        }
        if (txtEmail.value == currentUserObject[temp]["Email"]) {
          alert("Email already exists, Enter another Email");
          unique = false;
        }
        if (!re.test(txtPhone.value)) {
          alert("Telephone not in the correct format");
          unique = false;
        }
      }
    }
  }
  //console.log(!re.test(txtPhone.value));

  return unique;
}

document.getElementById("btnReset").onclick = function () {
  txtID.value = "";
  txtFullName.value = "";
  txtEmail.value = "";
  txtPhone.value = "";
  txtAge.value = "";
};

document.getElementById("btnDisplay").onclick = function () {
  if (localStorage.length > 0) {
    var currentTable = document.getElementById("infoTable");
    var currentTBody = document.getElementById("infoTableBody");
    currentTBody.parentNode.removeChild(currentTBody);

    let tBody = document.createElement("tbody");
    tBody.setAttribute("id", "infoTableBody");
    var currentTable = document.getElementById("infoTable");
    currentTable.appendChild(tBody);
    let insertedRow;

    document.getElementById("infoTable").style.display = "inline";
    document.getElementById("errMsg").style.display = "";
    var currentUserObject = JSON.parse(localStorage.getItem("userList"));

    for (var temp = 0; temp < currentUserObject.length; temp++) {
      /*       console.log(JSON.parse(localStorage.getItem(localStorage.key(temp))));
      console.log(currentUserObject["ID"]); */

      insertedRow = tBody.insertRow(tBody.length);
      cellID = insertedRow.insertCell(0);
      cellID.innerHTML = currentUserObject[temp]["ID"];
      cellFullName = insertedRow.insertCell(1);
      cellFullName.innerHTML = currentUserObject[temp]["Full Name"];
      cellEmail = insertedRow.insertCell(2);
      cellEmail.innerHTML = currentUserObject[temp]["Email"];
      cellPhone = insertedRow.insertCell(3);
      cellPhone.innerHTML = currentUserObject[temp]["Telephone"];
      cellAge = insertedRow.insertCell(4);
      cellAge.innerHTML = currentUserObject[temp]["Age"];
    }
  } else {
    document.getElementById("infoTable").style.display = "";
    document.getElementById("errMsg").style.display = "inline";
  }
};
