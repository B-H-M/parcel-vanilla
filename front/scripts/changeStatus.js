// const token = localStorage.getItem('token');
// const role = localStorage.getItem('role');

// if(!token) {
//     window.location.href = './login.html';
// }

// if(role !== "admin") {
//     window.location.href = './userProfile.html';
// }

const editStatus = (e) => {
    e.preventDefault();

    fetch(" https://parcel-sender-app-backend.herokuapp.com/api/v1/parcels/status", {
        method: "PATCH",
        headers: {
            "Content-type" : "application/json",
            Authorization: token
        },
        body: JSON.stringify({
            parcelId: document.querySelector("#parcelId").value,
            status: document.querySelector('#status').value
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if (res.details){//=== "in transit" || res.details === "Delivered" || res.details === "Cancelled") {
            window.location = "adminPage.html"
            toastr.success("status changed successfully!")
        } else if (res.msg) {
            toastr.error(res.msg);
        }
    })
    .catch(err => console.log("error occured:", err))
}

document
  .getElementById("status-form")
  .addEventListener("submit", editStatus);


$(document).ready(function(){
    $(".hamburger-nav").on("click", function(){

    $(".first-ul").toggleClass("open");

    });
});